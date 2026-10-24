'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFound() {
  const { t } = useTranslation();
  const title = t('notFound.title', null);
  const message = t('notFound.message', null);
  const returnHome = t('notFound.returnHome', null);

  return (
    <div className="error-div roboto-regular">
      <h2>{title}</h2>

      <p>{message}</p>

      <Link href="/">{returnHome}</Link>
    </div>
  );
}