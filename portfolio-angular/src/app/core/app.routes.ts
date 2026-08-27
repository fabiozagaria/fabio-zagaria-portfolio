import { Routes } from '@angular/router';

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
          'Progetti e laboratori di Fabio Zagaria: Gestionale Spese, LabTV e Task Manager Security Lab con codice, tecnologie e stato reale.',
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

