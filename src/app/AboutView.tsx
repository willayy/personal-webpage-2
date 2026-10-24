'use client';

import styles from './page.module.css';
import { useTranslation } from '@/hooks/useTranslation';

interface AboutViewProps {
  introductionText: string;
  skillSummaryText: string;
  primarySkills: string[];
  secondarySkills: string[];
}

const topicStyle = 'topic';
const secondaryTopicStyle = 'secondary-topic';
const topicList = 'topicList';

export default function AboutView({
  introductionText,
  skillSummaryText,
  primarySkills,
  secondarySkills,
}: Readonly<AboutViewProps>) {
  const { t } = useTranslation();
  const nameTitle = t('about.title', null);
  const skillsTitle = t('about.skillsTitle', null);
  const secondaryTitle = t('about.secondarySkillsTitle', null);

  return (
    <main>
      <div className={styles.aboutTextbox + ' roboto-regular'}>
        <h1> {nameTitle} </h1>

        <p> {introductionText} </p>

        <h2> {skillsTitle} </h2>

        <p> {skillSummaryText} </p>

        <ul className={topicList}>
          {primarySkills?.map((skill) => (
            <li key={skill} className={topicStyle}>
              {skill}
            </li>
          ))}
        </ul>

        <h3> {secondaryTitle} </h3>

        <ul className={topicList}>
          {secondarySkills?.map((skill) => (
            <li key={skill} className={secondaryTopicStyle}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
