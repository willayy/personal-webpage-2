'use client';

import { useState, useMemo } from 'react';
import ContributionListItem from '@/components/ContributionListItem/ContributionListItem';
import List from '@/components/List/List';
import { ContributedRepo } from '@/api/github-api';
import { FaSearch } from 'react-icons/fa';
import styles from './ContributionsView.module.css';
import { useTranslation } from '@/hooks/useTranslation';

const listBox = 'listBox';

interface ContributionsViewModel {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredData: ContributedRepo[];
}

function filterRepoByQuery(repo: ContributedRepo, query: string): boolean {
  const isQueryEmpty = query === '';
  if (isQueryEmpty) {
    return true;
  }
  const lowerName = repo.name.toLowerCase();
  const nameMatches = lowerName.includes(query);
  const lowerDesc = repo.description.toLowerCase();
  const descMatches = lowerDesc.includes(query);
  const lowerTopics = repo.topics.map((t) => t.toLowerCase());
  const topicMatches = lowerTopics.some((t) => t.includes(query));
  const hasMatch = nameMatches || descMatches || topicMatches;
  return hasMatch;
}

export function useContributionsViewModel(
  data: ContributedRepo[]
): ContributionsViewModel {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const result = data.filter((repo) => filterRepoByQuery(repo, query));
    return result;
  }, [data, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}

interface ContributionsViewProps {
  data: ContributedRepo[];
  githubUserLink: string;
  viewModel: ContributionsViewModel;
}

export function ContributionsView({
  data,
  githubUserLink,
  viewModel,
}: ContributionsViewProps) {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery, filteredData } = viewModel;

  const pageTitle = t('contributions.title', null);
  const descriptionText = t('contributions.description', null);
  const githubLinkText = t('contributions.githubLinkText', null);
  const searchPlaceholder = t('contributions.searchPlaceholder', null);
  const searchAriaLabel = t('contributions.searchAriaLabel', null);
  const showingResults = t('contributions.showingResults', {
    count: filteredData.length,
    total: data.length,
  });

  return (
    <main>
      <div className={listBox + ' roboto-regular'}>
        <h1> {pageTitle} </h1>

        <p>{descriptionText}</p>

        <a href={githubUserLink} target="_blank" rel="noopener noreferrer">
          {githubLinkText}
        </a>

        <div className={styles.controlsContainer}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label={searchAriaLabel}
            />
          </div>
        </div>

        <p className={styles.resultsCount}>{showingResults}</p>

        <List>
          {filteredData.map((repo) => (
            <ContributionListItem
              title={repo.name}
              description={repo.description}
              link={repo.url}
              topics={repo.topics}
              created={repo.created_at}
              lastUpdated={repo.updated_at}
              pullRequestsCount={repo.pull_requests_count}
              additions={repo.additions}
              deletions={repo.deletions}
              key={repo.id}
            />
          ))}
        </List>
      </div>
    </main>
  );
}

interface ContributionsContainerProps {
  data: ContributedRepo[];
  githubUserLink: string;
}

export default function ContributionsContainer({
  data,
  githubUserLink,
}: ContributionsContainerProps) {
  const viewModel = useContributionsViewModel(data);

  return (
    <ContributionsView
      data={data}
      githubUserLink={githubUserLink}
      viewModel={viewModel}
    />
  );
}
