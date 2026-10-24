'use client';

import EmploymentListItem from '@/components/EmploymentListItem/EmploymentListItem';
import List from '@/components/List/List';
import { useTranslation } from '@/hooks/useTranslation';

interface Employment {
  id: number;
  position: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CareerViewProps {
  data: Employment[];
}

const listBox = 'listBox';

export default function CareerView({ data }: Readonly<CareerViewProps>) {
  const { t } = useTranslation();
  const pageTitle = t('career.title', null);

  return (
    <main>
      <div className={listBox + ' roboto-regular'}>
        <h1> {pageTitle} </h1>

        <List>
          {data?.map((employment) => (
            <EmploymentListItem
              position={employment.position}
              organization={employment.organization}
              startDate={employment.startDate}
              endDate={employment.endDate}
              description={employment.description}
              key={employment.id}
            />
          ))}
        </List>
      </div>
    </main>
  );
}
