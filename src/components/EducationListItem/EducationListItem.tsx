'use client';

import styles from './EducationListItem.module.css';
import '@/app/globals.css';
import { useTranslation } from '@/hooks/useTranslation';

interface EducationListItemProps {
  school: string;
  degree: string;
  graduation: string;
}

const listItem = 'listItem';

export default function EducationListItem({
  school,
  degree,
  graduation,
}: Readonly<EducationListItemProps>) {
  const { t } = useTranslation();
  const graduationLabel = t('education.graduation', null);

  return (
    <li className={listItem}>
      <h2>{school}</h2>

      <p className={styles.degree}> {degree} </p>

      <p>
        <strong>{graduationLabel}</strong> {graduation}{' '}
      </p>
    </li>
  );
}