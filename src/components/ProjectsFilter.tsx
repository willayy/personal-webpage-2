import { useState, useMemo, ChangeEvent } from 'react';
import type { Repo } from '@/api/github-api';
import { FaSearch, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { formatDate } from '@/utils/dates';
import { translateByKey } from '@/utils/localization';
import styles from './ProjectsFilter.module.css';

type SchoolProjectFilter = 'all' | 'yes' | 'no';

interface ProjectsViewModel {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSchoolProjects: SchoolProjectFilter;
  setShowSchoolProjects: (filter: SchoolProjectFilter) => void;
  filteredData: Repo[];
}

function filter_by_search_query(repo: Repo, query: string): boolean {
  const isQueryEmpty = query === '';
  if (isQueryEmpty) {
    return true;
  }
  const lowerName = repo.name.toLowerCase();
  const nameMatches = lowerName.includes(query);
  const rawDesc = repo.description || '';
  const lowerDesc = rawDesc.toLowerCase();
  const descMatches = lowerDesc.includes(query);
  const lowerTopics = repo.topics?.map((topic) => topic.toLowerCase()) || [];
  const topicMatches = lowerTopics.some((topic) => topic.includes(query));
  const hasSearchMatch = nameMatches || descMatches || topicMatches;
  return hasSearchMatch;
}

function check_is_school_repo(repo: Repo): boolean {
  const lowerTopics = repo.topics?.map((topic) => topic.toLowerCase()) || [];
  const isSchool = lowerTopics.some((topic) => {
    const hasSchool = topic.includes('school');
    const hasUniversity = topic.includes('university');
    const hasChalmers = topic.includes('chalmers');
    return hasSchool || hasUniversity || hasChalmers;
  });
  return isSchool;
}

function filter_by_school_type(repo: Repo, filter: SchoolProjectFilter): boolean {
  if (filter === 'all') {
    return true;
  }
  const isSchool = check_is_school_repo(repo);
  const matchesYes = filter === 'yes' && isSchool;
  const matchesNo = filter === 'no' && !isSchool;
  return matchesYes || matchesNo;
}

export function use_projects_view_model(data: Repo[]): ProjectsViewModel {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSchoolProjects, setShowSchoolProjects] = useState<SchoolProjectFilter>('all');

  const filteredData = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const result = data?.filter((repo) => {
      const searchMatch = filter_by_search_query(repo, lowerQuery);
      const schoolMatch = filter_by_school_type(repo, showSchoolProjects);
      return searchMatch && schoolMatch;
    });
    const finalData = result || [];
    return finalData;
  }, [data, searchQuery, showSchoolProjects]);

  return {
    searchQuery,
    setSearchQuery,
    showSchoolProjects,
    setShowSchoolProjects,
    filteredData,
  };
}

interface ProjectsFilterProps {
  data: Repo[];
  githubUserLink: string;
}

interface ProjectsViewProps {
  data: Repo[];
  githubUserLink: string;
  viewModel: ProjectsViewModel;
}

function render_topic_item(topic: string) {
  return (
    <li key={topic} className="topic">
      {topic}
    </li>
  );
}

function render_repo_item(repo: Repo, githubUserLink: string) {
  const projectLink = githubUserLink + repo.name;
  const formattedCreated = formatDate(repo.created_at);
  const formattedUpdated = formatDate(repo.updated_at);
  const linkText = translateByKey('en', 'projects.linkToProject', null);
  const createdLabel = translateByKey('en', 'projects.created', null);
  const updatedLabel = translateByKey('en', 'projects.lastUpdated', null);
  const topicsLabel = translateByKey('en', 'projects.topics', null);
  const topicElements = repo.topics?.map(render_topic_item);

  return (
    <li key={repo.id} className="listItem">
      <h2>{repo.name}</h2>
      <a href={projectLink} target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
      <p>{repo.description}</p>
      <p>
        <strong>{createdLabel}</strong> {formattedCreated}
      </p>
      <p>
        <strong>{updatedLabel}</strong> {formattedUpdated}
      </p>
      <p>
        <strong>{topicsLabel}</strong>
      </p>
      <ul className="topicList">{topicElements}</ul>
    </li>
  );
}

export function ProjectsFilterView({
  data,
  githubUserLink,
  viewModel,
}: ProjectsViewProps) {
  const {
    searchQuery,
    setSearchQuery,
    showSchoolProjects,
    setShowSchoolProjects,
    filteredData,
  } = viewModel;

  const countParams = {
    count: filteredData.length,
    total: data.length,
  };
  const countText = translateByKey('en', 'projects.showingResults', countParams);
  const searchPlaceholder = translateByKey('en', 'projects.searchPlaceholder', null);
  const searchAriaLabel = translateByKey('en', 'projects.searchAriaLabel', null);
  const filterLegend = translateByKey('en', 'projects.filterLabel', null);
  const filterAllText = translateByKey('en', 'projects.filterAll', null);
  const filterSchoolText = translateByKey('en', 'projects.filterSchool', null);
  const filterPersonalText = translateByKey('en', 'projects.filterPersonal', null);

  function handle_search_change(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;
    setSearchQuery(nextValue);
  }

  function handle_select_all() {
    setShowSchoolProjects('all');
  }

  function handle_select_school() {
    setShowSchoolProjects('yes');
  }

  function handle_select_personal() {
    setShowSchoolProjects('no');
  }

  const allClass = `${styles.filterButton} ${showSchoolProjects === 'all' ? styles.active : ''}`;
  const schoolClass = `${styles.filterButton} ${showSchoolProjects === 'yes' ? styles.active : ''}`;
  const personalClass = `${styles.filterButton} ${
    showSchoolProjects === 'no' ? styles.active : ''
  }`;

  const repoElements = filteredData.map((repo) => render_repo_item(repo, githubUserLink));

  return (
    <div>
      <div className={styles.controlsContainer}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handle_search_change}
            className={styles.searchInput}
            aria-label={searchAriaLabel}
          />
        </div>

        <fieldset className={styles.filterContainer}>
          <legend className={styles.filterLabel}>{filterLegend}</legend>
          <div className={styles.filterButtons}>
            <button
              className={allClass}
              onClick={handle_select_all}
              aria-pressed={showSchoolProjects === 'all'}
            >
              {filterAllText}
            </button>
            <button
              className={schoolClass}
              onClick={handle_select_school}
              aria-pressed={showSchoolProjects === 'yes'}
            >
              <FaGraduationCap className={styles.buttonIcon} /> {filterSchoolText}
            </button>
            <button
              className={personalClass}
              onClick={handle_select_personal}
              aria-pressed={showSchoolProjects === 'no'}
            >
              <FaBriefcase className={styles.buttonIcon} /> {filterPersonalText}
            </button>
          </div>
        </fieldset>
      </div>

      <p className={styles.resultsCount}>{countText}</p>

      <ol style={{ listStyle: 'none', padding: 0 }}>{repoElements}</ol>
    </div>
  );
}

export default function ProjectsFilter({
  data,
  githubUserLink,
}: ProjectsFilterProps) {
  const viewModel = use_projects_view_model(data);

  return (
    <ProjectsFilterView
      data={data}
      githubUserLink={githubUserLink}
      viewModel={viewModel}
    />
  );
}
