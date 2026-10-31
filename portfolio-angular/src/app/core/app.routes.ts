import { Routes } from '@angular/router';
import { PROJECTS } from '../data/projects.data';

const projectVersionSummary = PROJECTS.filter((project) =>
  ['gestionale-spese', 'jobflow', 'accessdesk'].includes(project.id),
)
  .map(
    (project) =>
      `${project.title} ${project.versionTags?.map((version) => version.tag).join(' / ') ?? ''}`,
  )
  .join(' · ');

export const routes: Routes = [
  {
    path: '',
    title: 'Fabio Zagaria | Junior Backend Developer',
    data: {
      seo: {
        path: '/',
        description:
          'Portfolio di Fabio Zagaria, Junior Backend Developer: progetti con Java, Spring Boot, MySQL, Angular e TypeScript.',
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
        description:
          `Expense Tracker, JobFlow e Access Desk (${projectVersionSummary}): progetti full stack e backend di Fabio Zagaria con Angular, Spring Boot, JWT e database SQL.`
      },
    },
    loadComponent: () =>
      import('../features/projects/projects.component').then((m) => m.ProjectsComponent),
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
