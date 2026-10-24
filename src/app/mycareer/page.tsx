import CareerView from './CareerView';
import employmentDataRaw from '@/data/employments.json';

type Employment = {
  id: number;
  position: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
};

export default async function Career() {
  const employmentData: Employment[] = employmentDataRaw.employments;
  return <CareerView data={employmentData} />;
}
