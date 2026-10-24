import { useState, useMemo, ChangeEvent } from 'react';
import type { ContributedRepo } from '@/api/github-api';
import { FaSearch } from 'react-icons/fa';
import { formatDate } from '@/utils/dates';
import { translateByKey } from '@/utils/localization';
import styles from './ContributionsFilter.module.css';

interface ContributionsViewModel {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredData: ContributedRepo[];
}

function filter_by_search_query(repo: ContributedRepo, query: string): boolean {
  const isQueryEmpty = query === '';
  if (isQueryEmpty) {
    return true;
  }
  const lowerName = repo.name.toLowerCase();
  const nameMatches = lowerName.includes(query);
  const rawDesc = repo.description || '';
  const lowerDesc = rawDesc.toLowerCase();
  const descMatches = lowerDesc.includes(query);
  const lowerTopics = repo.topics?.map((topic) => topic.toLowerCase()) || [];
  const topicMatches = lowerTopics.some((topic) => topic.includes(query));
  const hasMatch = nameMatches || descMatches || topicMatches;
  return hasMatch;
}

export function use_contributions_view_model(
  data: ContributedRepo[]
): ContributionsViewModel {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const result = data?.filter((repo) => filter_by_search_query(repo, lowerQuery));
    const finalData = result || [];
    return finalData;
  }, [data, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}

interface ContributionsFilterProps {
  data: ContributedRepo[];
}

interface ContributionsViewProps {
  data: ContributedRepo[];
  viewModel: ContributionsViewModel;
}

function render_topic_item(topic: string) {
  return (
    <li key={topic} className="topic">
      {topic}
    </li>
  );
}

function render_repo_item(repo: ContributedRepo) {
  const formattedCreated = formatDate(repo.created_at);
  const formattedUpdated = formatDate(repo.updated_at);
  const formattedAdditions = repo.additions.toLocaleString('en-US');
  const formattedDeletions = repo.deletions.toLocaleString('en-US');
  const linkText = translateByKey('en', 'contributions.linkToProject', null);
  const prLabel = translateByKey('en', 'contributions.pullRequests', null);
  const linesLabel = translateByKey('en', 'contributions.lines', null);
  const linesUnit = translateByKey('en', 'contributions.linesUnit', null);
  const createdLabel = translateByKey('en', 'contributions.created', null);
  const updatedLabel = translateByKey('en', 'contributions.lastUpdated', null);
  const topicsLabel = translateByKey('en', 'contributions.topics', null);
  const topicElements = repo.topics?.map(render_topic_item);

  return (
    <li key={repo.id} className="listItem">
      <h2>{repo.name}</h2>
      <a href={repo.url} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
      <p>{repo.description}</p>
      <div className={styles.statsContainer}>
        <p className={styles.statItem}>
          <strong>{prLabel}</strong> {repo.pull_requests_count}
        </p>
        <p className={styles.statItem}>
          <strong>{linesLabel}</strong>{' '}
          <span className={styles.additions}>+{formattedAdditions}</span>
          {' / '}
          <span className={styles.deletions}>
            -{formattedDeletions} {linesUnit}
          </span>
        </p>
      </div>
      <p>
        <strong>{createdLabel}</strong> {formattedCreated}
      </p>
      <p>
        <strong>{updatedLabel}</strong> {formattedUpdated}
      </p>
      <p>
        <strong>{topicsLabel}</strong>
      </p>
      <ul className="topicList">{topicElements}</ul>
    </li>
  );
}

export function ContributionsFilterView({
  data,
  viewModel,
}: ContributionsViewProps) {
  const { searchQuery, setSearchQuery, filteredData } = viewModel;

  const countParams = {
    count: filteredData.length,
    total: data.length,
  };
  const countText = translateByKey(
    'en',
    'contributions.showingResults',
    countParams
  );
  const searchPlaceholder = translateByKey(
    'en',
    'contributions.searchPlaceholder',
    null
  );
  const searchAriaLabel = translateByKey(
    'en',
    'contributions.searchAriaLabel',
    null
  );

  function handle_search_change(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;
    setSearchQuery(nextValue);
  }

  const repoElements = filteredData.map(render_repo_item);

  return (
    <div>
      <div className={styles.controlsContainer}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handle_search_change}
            className={styles.searchInput}
            aria-label={searchAriaLabel}
          />
        </div>
      </div>

      <p className={styles.resultsCount}>{countText}</p>

      <ol style={{ listStyle: 'none', padding: 0 }}>{repoElements}</ol>
    </div>
  );
}

export default function ContributionsFilter({
  data,
}: ContributionsFilterProps) {
  const viewModel = use_contributions_view_model(data);

  return (
    <ContributionsFilterView
      data={data}
      viewModel={viewModel}
    />
  );
}
