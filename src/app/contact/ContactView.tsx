'use client';

import { useTranslation } from '@/hooks/useTranslation';

const listBox = 'listBox ';

export default function ContactView() {
  const { t } = useTranslation();
  const mailLabel = t('contact.mail', null);

  return (
    <main>
      <div className={listBox + 'roboto-regular'}>
        <h3> {mailLabel} </h3>
        <a href="mailto:williamnorland@gmail.com">
          williamnorland@gmail.com
        </a>
      </div>
    </main>
  );
}
