import { Routes } from '@angular/router';
import { PROJECTS } from '../data/projects.data';
import { plainText } from '../shared/rich-text/rich-text.pipe';

const projectVersionSummary = PROJECTS.filter((project) =>
  ['gestionale-spese', 'jobflow', 'accessdesk'].includes(project.id),
)
  .map(
    (project) =>
      `${project.title} ${'versionTags' in project ? project.versionTags.map((version) => version.tag).join(' / ') : ''}`,
  )
  .join(' · ');

/** Una pagina di dettaglio per ogni progetto curato, con titolo e descrizione propri. */
const projectDetailRoutes: Routes = PROJECTS.map((project) => ({
  path: `projects/${project.id}`,
  title: `${project.title} | Fabio Zagaria`,
  data: {
    projectId: project.id,
    seo: { path: `/projects/${project.id}`, description: plainText(project.description) },
  },
  loadComponent: () =>
    import('../features/projects/project-detail/project-detail.component').then(
      (m) => m.ProjectDetailComponent,
    ),
}));

export const routes: Routes = [
  {
    path: '',
    title: 'Fabio Zagaria | Junior Backend Developer',
    data: {
      seo: {
        path: '/',
        description:
          'Portfolio di Fabio Zagaria, Junior Backend Developer: progetti con Java, Spring Boot, PostgreSQL, Angular e TypeScript.',
      },
    },
    loadComponent: () => import('../features/home/home.component').then((m) => m.HomeComponent),
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'about',
    title: 'Chi sono | Fabio Zagaria',
    data: {
      seo: {
        path: '/about',
        description:
          'Percorso, competenze e obiettivi professionali di Fabio Zagaria, Junior Backend Developer con visione full stack.',
      },
    },
    loadComponent: () => import('../features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'experience',
    title: 'Esperienza e formazione | Fabio Zagaria',
    data: {
      seo: {
        path: '/experience',
        description:
          'Esperienza professionale e formazione Full Stack Web di Fabio Zagaria, con focus su Java, Spring Boot e sviluppo backend.',
      },
    },
    loadComponent: () =>
      import('../features/experience/experience.component').then((m) => m.ExperienceComponent),
  },
  {
    path: 'projects',
    title: 'Progetti | Fabio Zagaria',
    data: {
      seo: {
        path: '/projects',
        description: `Expense Tracker, JobFlow e AccessDesk (${projectVersionSummary}): progetti full stack e backend di Fabio Zagaria con Angular, Spring Boot, JWT e database SQL.`,
      },
    },
    loadComponent: () =>
      import('../features/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  ...projectDetailRoutes,
  {
    path: 'intelligenza-umana',
    title: 'Intelligenza Umana | Fabio Zagaria',
    data: {
      seo: {
        path: '/intelligenza-umana',
        description:
          'Intelligenza Umana: laboratorio tecnologico indipendente di Fabio Zagaria, orientato a software affidabile, ricerca applicata e collaborazione open source.',
      },
    },
    loadComponent: () =>
      import('../features/intelligenza-umana/intelligenza-umana.component').then(
        (m) => m.IntelligenzaUmanaComponent,
      ),
  },
  {
    path: 'contact',
    title: 'Contatti | Fabio Zagaria',
    data: {
      seo: {
        path: '/contact',
        description:
          'Contatta Fabio Zagaria per opportunità Junior Backend o Full Stack a Roma, ibride o da remoto in Italia.',
      },
    },
    loadComponent: () =>
      import('../features/contact/contact.component').then((m) => m.ContactComponent),
  },
  { path: '**', redirectTo: '' },
];
