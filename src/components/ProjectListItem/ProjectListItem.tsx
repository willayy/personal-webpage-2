'use client';

import { formatDate } from '@/utils/dates';
import '@/app/globals.css';
import { useTranslation } from '@/hooks/useTranslation';

interface ProjectListItemProps {
  title: string;
  description: string;
  link: string;
  topics: string[];
  created: string;
  lastUpdated: string;
}

const listItem = 'listItem';
const topicList = 'topicList';
const topicStyle = 'topic';

export default function ProjectListItem({
  title,
  description,
  link,
  topics,
  created,
  lastUpdated,
}: Readonly<ProjectListItemProps>) {
  const { t } = useTranslation();
  const formattedCreated = formatDate(created);
  const formattedUpdated = formatDate(lastUpdated);
  const linkText = t('projects.linkToProject', null);
  const createdLabel = t('projects.created', null);
  const updatedLabel = t('projects.lastUpdated', null);
  const topicsLabel = t('projects.topics', null);

  return (
    <li className={listItem}>
      <h2>{title}</h2>

      <a href={link} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>

      <p>{description}</p>

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