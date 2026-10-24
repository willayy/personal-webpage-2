'use client';

import styles from './Header.module.css';
import Link from 'next/link';
import {
    FaUser,
    FaProjectDiagram,
    FaCodeBranch,
    FaGraduationCap,
    FaBriefcase,
    FaEnvelope,
    FaGlobe
} from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function Header() {
    const { t, toggleLanguage, language } = useTranslation();
    const nextLangLabel = language === 'en' ? 'SV' : 'EN';

    return (

        <header className={styles.header}>

            <nav className={styles.nav}>

                <ul className={styles.headerUl + " roboto-bold"}>

                    <li className={styles.listItem}>

                        <Link href="/" className={styles.link}>
                            <FaUser className={styles.icon} />
                            <span>{t('header.about', null)}</span>
                        </Link>

                    </li>

                    <li className={styles.listItem}>

                        <Link href="/projects" className={styles.link}>
                            <FaProjectDiagram className={styles.icon} />
                            <span>{t('header.projects', null)}</span>
                        </Link>

                    </li>

                    <li className={styles.listItem}>

                        <Link href="/contributions" className={styles.link}>
                            <FaCodeBranch className={styles.icon} />
                            <span>{t('header.contributions', null)}</span>
                        </Link>

                    </li>

                    <li className={styles.listItem}>

                        <Link href="/education" className={styles.link}>
                            <FaGraduationCap className={styles.icon} />
                            <span>{t('header.education', null)}</span>
                        </Link>

                    </li>

                    <li className={styles.listItem}>

                        <Link href="/mycareer" className={styles.link}>
                            <FaBriefcase className={styles.icon} />
                            <span>{t('header.career', null)}</span>
                        </Link>

                    </li>

                    <li className={styles.listItem}>

                        <Link href="/contact" className={styles.link}>
                            <FaEnvelope className={styles.icon} />
                            <span>{t('header.contact', null)}</span>
                        </Link>

                    </li>

                    <li className={styles.listItem}>

                        <button
                            onClick={toggleLanguage}
                            className={styles.link}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            aria-label="Toggle language"
                        >
                            <FaGlobe className={styles.icon} />
                            <span>{nextLangLabel}</span>
                        </button>

                    </li>

                </ul>

            </nav>

        </header>

    );

}