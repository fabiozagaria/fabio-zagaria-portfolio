import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Fabio Zagaria | Junior Backend Developer',
    loadComponent: () => import('../features/home/home.component').then((m) => m.HomeComponent),
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'about',
    title: 'Chi sono | Fabio Zagaria',
    loadComponent: () => import('../features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'experience',
    title: 'Esperienza e formazione | Fabio Zagaria',
    loadComponent: () =>
      import('../features/experience/experience.component').then((m) => m.ExperienceComponent),
  },
  {
    path: 'projects',
    title: 'Progetti | Fabio Zagaria',
    loadComponent: () =>
      import('../features/projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'contact',
    title: 'Contatti | Fabio Zagaria',
    loadComponent: () =>
      import('../features/contact/contact.component').then((m) => m.ContactComponent),
  },
  { path: '**', redirectTo: '' },
];
