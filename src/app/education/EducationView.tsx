'use client';

import List from '@/components/List/List';
import EducationListItem from '@/components/EducationListItem/EducationListItem';
import { useTranslation } from '@/hooks/useTranslation';

interface EducationItem {
  id: number;
  school: string;
  degree: string;
  graduation: string;
}

interface EducationViewProps {
  data: EducationItem[];
}

const listBox = 'listBox';

export default function EducationView({ data }: Readonly<EducationViewProps>) {
  const { t } = useTranslation();
  const pageTitle = t('education.title', null);

  return (
    <main>
      <div className={listBox + ' roboto-regular'}>
        <h1> {pageTitle} </h1>

        <List>
          {data?.map((education) => (
            <EducationListItem
              school={education.school}
              degree={education.degree}
              graduation={education.graduation}
              key={education.id}
            />
          ))}
        </List>
      </div>
    </main>
  );
}
