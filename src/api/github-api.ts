import { Octokit } from "octokit"

// Fetches github repos using access token from .env.local,
// this is only for a single user and not for a general search
export async function fetchMyRepos(): Promise<Repo[]> {
  try {
    const octokit = new Octokit({
      auth: process.env.ACCESS_TOKEN_GH
    })

    const endpoint: string = 'GET /users/{username}/repos'

    const response = await octokit.request(endpoint, {
      username: 'willayy',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    return structuredClone(response.data)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return empty array on error to allow static export to complete
    return [];
  }
}

export type Repo = {
  id : number,
  name: string
  description: string,
  topics: string[],
  created_at: string,
  updated_at: string,
}

export type ContributedRepo = {
  id: number | string;
  name: string;
  description: string;
  url: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pull_requests_count: number;
  additions: number;
  deletions: number;
};

interface ContributorStatsWeek {
  w: number;
  a: number;
  d: number;
  c: number;
}

interface ContributorStatsItem {
  author?: {
    login: string;
  };
  weeks: ContributorStatsWeek[];
}

function sumAdditions(total: number, week: ContributorStatsWeek): number {
  return total + week.a;
}

function sumDeletions(total: number, week: ContributorStatsWeek): number {
  return total + week.d;
}

function calculateUserCodeStats(
  contributors: ContributorStatsItem[]
): { additions: number; deletions: number } {
  const userItem = contributors.find((c) => c.author?.login === 'willayy');
  const emptyStats = { additions: 0, deletions: 0 };
  const hasUser = Boolean(userItem);
  if (!hasUser || !userItem) {
    return emptyStats;
  }
  const additions = userItem.weeks.reduce(sumAdditions, 0);
  const deletions = userItem.weeks.reduce(sumDeletions, 0);
  return { additions, deletions };
}

async function requestContributorStats(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<ContributorStatsItem[]> {
  try {
    const endpoint: string = 'GET /repos/{owner}/{repo}/stats/contributors';
    const response = await octokit.request(endpoint, {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    const isArray = Array.isArray(response.data);
    const result = isArray ? response.data : [];
    return result;
  } catch {
    return [];
  }
}

async function fetchRepoPrCount(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<number> {
  try {
    const endpoint: string = 'GET /search/issues';
    const fullName = `${owner}/${repo}`;
    const query = `is:pr is:public author:willayy repo:${fullName}`;
    const response = await octokit.request(endpoint, {
      q: query,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response.data.total_count;
  } catch {
    return 0;
  }
}

function extractFullNameFromUrl(repoUrl: string): string {
  const parts = repoUrl.split('/');
  const repoName = parts[parts.length - 1];
  const ownerName = parts[parts.length - 2];
  return `${ownerName}/${repoName}`;
}

interface GraphQLRepoNode {
  nameWithOwner: string;
  isPrivate: boolean;
  owner: {
    login: string;
  };
}

interface GraphQLContributedResponse {
  user?: {
    repositoriesContributedTo?: {
      nodes?: GraphQLRepoNode[];
    };
  };
}

function isContributedPublicRepo(node: GraphQLRepoNode): boolean {
  const notPrivate = !node.isPrivate;
  const notOwnRepo = node.owner.login !== 'willayy';
  return notPrivate && notOwnRepo;
}

function compareByUpdatedAt(a: ContributedRepo, b: ContributedRepo): number {
  const dateA = new Date(a.updated_at);
  const dateB = new Date(b.updated_at);
  const timeA = dateA.getTime();
  const timeB = dateB.getTime();
  return timeB - timeA;
}

async function fetchRepoByFullName(
  octokit: Octokit,
  fullName: string
): Promise<ContributedRepo | null> {
  try {
    const parts = fullName.split('/');
    const owner = parts[0];
    const repo = parts[1];
    const endpoint: string = 'GET /repos/{owner}/{repo}';
    const response = await octokit.request(endpoint, {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    const statsItems = await requestContributorStats(octokit, owner, repo);
    const codeStats = calculateUserCodeStats(statsItems);
    const prCount = await fetchRepoPrCount(octokit, owner, repo);
    const data = response.data;
    const contributedRepo: ContributedRepo = {
      id: data.id,
      name: data.full_name,
      description: data.description || '',
      url: data.html_url,
      topics: data.topics || [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      pull_requests_count: prCount,
      additions: codeStats.additions,
      deletions: codeStats.deletions,
    };
    return contributedRepo;
  } catch (error) {
    console.error('Error fetching repo:', fullName, error);
    return null;
  }
}

export async function fetchContributedRepos(): Promise<ContributedRepo[]> {
  try {
    const token = process.env.ACCESS_TOKEN_GH;
    const octokit = new Octokit({
      auth: token
    });

    const repoNamesSet = new Set<string>();

    const prEndpoint: string = 'GET /search/issues';
    const prQuery: string = 'is:pr is:public author:willayy -user:willayy';
    const searchResponse = await octokit.request(prEndpoint, {
      q: prQuery,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const prItems = searchResponse.data.items;
    const repoUrls = prItems.map((item) => item.repository_url);
    const repoFullNames = repoUrls.map(extractFullNameFromUrl);
    repoFullNames.forEach((name) => repoNamesSet.add(name));

    if (token) {
      const graphQLQuery = `
        query {
          user(login: "willayy") {
            repositoriesContributedTo(
              first: 50,
              contributionTypes: [COMMIT, PULL_REQUEST, PULL_REQUEST_REVIEW]
            ) {
              nodes {
                nameWithOwner
                isPrivate
                owner {
                  login
                }
              }
            }
          }
        }
      `;
      const gqlResult = await octokit.graphql<GraphQLContributedResponse>(graphQLQuery);
      const nodes = gqlResult.user?.repositoriesContributedTo?.nodes || [];
      const publicNodes = nodes.filter(isContributedPublicRepo);
      const gqlNames = publicNodes.map((node) => node.nameWithOwner);
      gqlNames.forEach((name) => repoNamesSet.add(name));
    }

    const repoNames = Array.from(repoNamesSet);
    const promises = repoNames.map((name) => fetchRepoByFullName(octokit, name));
    const fetchedRepos = await Promise.all(promises);
    const validRepos = fetchedRepos.filter(
      (repo): repo is ContributedRepo => repo !== null
    );

    validRepos.sort(compareByUpdatedAt);
    return validRepos;
  } catch (error) {
    console.error('Error fetching contributed repos:', error);
    return [];
  }
}

export async function fetchLatestCvUrl(): Promise<string> {
  try {
    const token = process.env.ACCESS_TOKEN_GH;
    const octokit = new Octokit({
      auth: token,
    });
    const endpoint: string = 'GET /repos/{owner}/{repo}/releases/latest';
    const response = await octokit.request(endpoint, {
      owner: 'willayy',
      repo: 'curriculum-vitae',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const assets = response.data.assets;
    const isArray = Array.isArray(assets);
    if (!isArray) {
      return 'https://github.com/willayy/curriculum-vitae/releases';
    }
    const pdfAsset = assets.find((asset) => asset.name.endsWith('.pdf'));
    const downloadUrl = pdfAsset ? pdfAsset.browser_download_url : '';
    const hasUrl = Boolean(downloadUrl);
    if (!hasUrl) {
      return 'https://github.com/willayy/curriculum-vitae/releases';
    }
    return downloadUrl;
  } catch {
    return 'https://github.com/willayy/curriculum-vitae/releases';
  }
}