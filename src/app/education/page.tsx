import EducationView from './EducationView';
import educationDataRaw from '@/data/education.json';

export default async function EducationPage() {
  return <EducationView data={educationDataRaw} />;
}
