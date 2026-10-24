import ProjectsContainer from './ProjectsView';
import { fetchMyRepos, Repo } from '@/api/github-api';

export default async function Projects() {
  const data: Repo[] = await fetchMyRepos();
  const githubUserLink = process.env.GITHUB_USER_LINK || '';

  return <ProjectsContainer data={data} githubUserLink={githubUserLink} />;
}
