'use client';

import styles from './Footer.module.css';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
    const { t } = useTranslation();
    const githubUrl = process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL ?? "N/A";
    const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_IMAGE_URL ?? "N/A";
    const copyrightText = t('footer.copyright', null);
    const linkedinAlt = t('footer.linkedinAlt', null);
    const githubAlt = t('footer.githubAlt', null);

    return (

        <div className={styles.footerContainer}>

        <footer className={styles.footer}>

            <div className={styles.copyrightBox}>

                <p className={"roboto-regular"}> {copyrightText} </p>
                
            </div>

            <div className={styles.socialsBox}>

                <a
                    href="https://www.linkedin.com/in/william-norland-69475b263/"
                    target="_blank"
                    rel="noreferrer"
                >

                    <Image
                        className={styles.img}
                        src={linkedinUrl}
                        alt={linkedinAlt}
                        width={112}
                        height={28}
                    />

                </a>

                <a href="https://github.com/willayy" target="_blank" rel="noreferrer">

                    <Image
                        className={styles.img}
                        src={githubUrl}
                        alt={githubAlt}
                        width={50}
                        height={50}
                    />

                </a>

            </div>
            
        </footer>

        </div>

    );

}