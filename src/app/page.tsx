import AboutView from './AboutView';
import skillsDataRaw from '@/data/skills.json';

export default async function Home() {
  const introductionText: string = skillsDataRaw.introduction;
  const skillSummaryText: string = skillsDataRaw.skillSummary;
  const primarySkills: string[] = skillsDataRaw.primarySkills;
  const secondarySkills: string[] = skillsDataRaw.secondarySkills;

  return (
    <AboutView
      introductionText={introductionText}
      skillSummaryText={skillSummaryText}
      primarySkills={primarySkills}
      secondarySkills={secondarySkills}
    />
  );
}
