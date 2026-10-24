import ContributionsContainer from './ContributionsView';
import { fetchContributedRepos, ContributedRepo } from '@/api/github-api';

export default async function Contributions() {
  const data: ContributedRepo[] = await fetchContributedRepos();
  const githubUserLink = process.env.GITHUB_USER_LINK || '';

  return (
    <ContributionsContainer
      data={data}
      githubUserLink={githubUserLink}
    />
  );
}
