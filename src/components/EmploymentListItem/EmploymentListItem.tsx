'use client';

import styles from './EmploymentListItem.module.css';
import '@/app/globals.css';
import { useTranslation } from '@/hooks/useTranslation';

interface EmploymentListItemProps {
  position: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

const listItem = 'listItem';

export default function EmploymentListItem({
  position,
  organization,
  startDate,
  endDate,
  description,
}: Readonly<EmploymentListItemProps>) {
  const { t } = useTranslation();
  const fromToLabel = t('career.fromTo', null);

  return (
    <li className={listItem}>
      <h2>{position}</h2>

      <p className={styles.organization}> {organization} </p>

      <p className={styles.text}>{description}</p>

      <p>
        <strong>{fromToLabel}</strong> {startDate} - {endDate}{' '}
      </p>
    </li>
  );
}