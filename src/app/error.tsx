'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset?: () => void;
}>) {
  const { t } = useTranslation();
  const errorTitle = t('error.title', null);
  const tryAgainText = t('error.tryAgain', null);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-div roboto-regular">
      <h2>{errorTitle}</h2>

      <button
        className="error-button roboto-regular"
        onClick={() => reset?.()}
      >
        {tryAgainText}
      </button>
    </div>
  );
}