'use client';

import { useState, useMemo } from 'react';
import ProjectListItem from '@/components/ProjectListItem/ProjectListItem';
import List from '@/components/List/List';
import { Repo } from '@/api/github-api';
import { FaSearch, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import styles from './ProjectsView.module.css';
import { useTranslation } from '@/hooks/useTranslation';

const listBox = 'listBox';

type SchoolProjectFilter = 'all' | 'yes' | 'no';

interface ProjectsViewModel {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSchoolProjects: SchoolProjectFilter;
  setShowSchoolProjects: (filter: SchoolProjectFilter) => void;
  filteredData: Repo[];
}

function matchesSearchQuery(repo: Repo, query: string): boolean {
  const isQueryEmpty = query === '';
  if (isQueryEmpty) {
    return true;
  }
  const lowerName = repo.name.toLowerCase();
  const nameMatches = lowerName.includes(query);
  const lowerDesc = repo.description?.toLowerCase() || '';
  const descMatches = lowerDesc.includes(query);
  const lowerTopics = repo.topics?.map((topic) => topic.toLowerCase()) || [];
  const topicMatches = lowerTopics.some((topic) => topic.includes(query));
  const hasSearchMatch = nameMatches || descMatches || topicMatches;
  return hasSearchMatch;
}

function isSchoolRepo(repo: Repo): boolean {
  const lowerTopics = repo.topics?.map((topic) => topic.toLowerCase()) || [];
  const isSchool = lowerTopics.some((topic) => {
    const hasSchool = topic.includes('school');
    const hasUniversity = topic.includes('university');
    const hasChalmers = topic.includes('chalmers');
    return hasSchool || hasUniversity || hasChalmers;
  });
  return isSchool;
}

function matchesSchoolFilter(repo: Repo, filter: SchoolProjectFilter): boolean {
  if (filter === 'all') {
    return true;
  }
  const isSchool = isSchoolRepo(repo);
  const matchesYes = filter === 'yes' && isSchool;
  const matchesNo = filter === 'no' && !isSchool;
  return matchesYes || matchesNo;
}

export function useProjectsViewModel(data: Repo[]): ProjectsViewModel {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSchoolProjects, setShowSchoolProjects] = useState<SchoolProjectFilter>('all');

  const filteredData = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const result = data?.filter((repo) => {
      const searchMatch = matchesSearchQuery(repo, lowerQuery);
      const schoolMatch = matchesSchoolFilter(repo, showSchoolProjects);
      return searchMatch && schoolMatch;
    });
    return result || [];
  }, [data, searchQuery, showSchoolProjects]);

  return {
    searchQuery,
    setSearchQuery,
    showSchoolProjects,
    setShowSchoolProjects,
    filteredData,
  };
}

interface ProjectsViewProps {
  data: Repo[];
  githubUserLink: string;
  viewModel: ProjectsViewModel;
}

export function ProjectsView({
  data,
  githubUserLink,
  viewModel,
}: ProjectsViewProps) {
  const { t } = useTranslation();
  const {
    searchQuery,
    setSearchQuery,
    showSchoolProjects,
    setShowSchoolProjects,
    filteredData,
  } = viewModel;

  const pageTitle = t('projects.title', null);
  const descriptionText = t('projects.description', null);
  const githubLinkText = t('projects.githubLinkText', null);
  const searchPlaceholder = t('projects.searchPlaceholder', null);
  const searchAriaLabel = t('projects.searchAriaLabel', null);
  const filterLabel = t('projects.filterLabel', null);
  const filterAll = t('projects.filterAll', null);
  const filterSchool = t('projects.filterSchool', null);
  const filterPersonal = t('projects.filterPersonal', null);
  const showingResults = t('projects.showingResults', {
    count: filteredData?.length || 0,
    total: data?.length || 0,
  });

  return (
    <main>
      <div className={listBox + ' roboto-regular'}>
        <h1> {pageTitle} </h1>

        <p>{descriptionText}</p>

        <a href={githubUserLink} target="_blank" rel="noopener noreferrer">
          {githubLinkText}
        </a>

        <div className={styles.controlsContainer}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label={searchAriaLabel}
            />
          </div>

          <fieldset className={styles.filterContainer}>
            <legend className={styles.filterLabel}>{filterLabel}</legend>
            <div className={styles.filterButtons}>
              <button
                className={
                  `${styles.filterButton} ${showSchoolProjects === 'all' ? styles.active : ''}`
                }
                onClick={() => setShowSchoolProjects('all')}
                aria-pressed={showSchoolProjects === 'all'}
              >
                {filterAll}
              </button>
              <button
                className={
                  `${styles.filterButton} ${showSchoolProjects === 'yes' ? styles.active : ''}`
                }
                onClick={() => setShowSchoolProjects('yes')}
                aria-pressed={showSchoolProjects === 'yes'}
              >
                <FaGraduationCap className={styles.buttonIcon} /> {filterSchool}
              </button>
              <button
                className={
                  `${styles.filterButton} ${showSchoolProjects === 'no' ? styles.active : ''}`
                }
                onClick={() => setShowSchoolProjects('no')}
                aria-pressed={showSchoolProjects === 'no'}
              >
                <FaBriefcase className={styles.buttonIcon} /> {filterPersonal}
              </button>
            </div>
          </fieldset>
        </div>

        <p className={styles.resultsCount}>{showingResults}</p>

        <List>
          {filteredData?.map((repo) => {
            const projectLink = githubUserLink + repo.name;
            return (
              <ProjectListItem
                title={repo.name}
                description={repo.description}
                link={projectLink}
                topics={repo.topics}
                created={repo.created_at}
                lastUpdated={repo.updated_at}
                key={repo.id}
              />
            );
          })}
        </List>
      </div>
    </main>
  );
}

interface ProjectsContainerProps {
  data: Repo[];
  githubUserLink: string;
}

export default function ProjectsContainer({
  data,
  githubUserLink,
}: ProjectsContainerProps) {
  const viewModel = useProjectsViewModel(data);

  return (
    <ProjectsView
      data={data}
      githubUserLink={githubUserLink}
      viewModel={viewModel}
    />
  );
}
