'use client';

import { formatDate } from '@/utils/dates';
import '@/app/globals.css';
import styles from './ContributionListItem.module.css';
import { useTranslation } from '@/hooks/useTranslation';

interface ContributionListItemProps {
  title: string;
  description: string;
  link: string;
  topics: string[];
  created: string;
  lastUpdated: string;
  pullRequestsCount: number;
  additions: number;
  deletions: number;
}

const listItem = 'listItem';
const topicList = 'topicList';
const topicStyle = 'topic';

export default function ContributionListItem({
  title,
  description,
  link,
  topics,
  created,
  lastUpdated,
  pullRequestsCount,
  additions,
  deletions,
}: Readonly<ContributionListItemProps>) {
  const { t } = useTranslation();
  const formattedCreated = formatDate(created);
  const formattedUpdated = formatDate(lastUpdated);
  const formattedAdditions = additions.toLocaleString('en-US');
  const formattedDeletions = deletions.toLocaleString('en-US');
  const linkText = t('contributions.linkToProject', null);
  const prLabel = t('contributions.pullRequests', null);
  const linesLabel = t('contributions.lines', null);
  const linesUnit = t('contributions.linesUnit', null);
  const createdLabel = t('contributions.created', null);
  const updatedLabel = t('contributions.lastUpdated', null);
  const topicsLabel = t('contributions.topics', null);

  return (
    <li className={listItem}>
      <h2>{title}</h2>

      <a href={link} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>

      <p>{description}</p>

      <div className={styles.statsContainer}>
        <p className={styles.statItem}>
          <strong>{prLabel}</strong> {pullRequestsCount}
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

      <ul className={topicList}>
        {topics.map((topic) => (
          <li key={topic} className={topicStyle}>
            {topic}
          </li>
        ))}
      </ul>
    </li>
  );
}
