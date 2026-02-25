import { Routes } from '@angular/router';
import { Blog } from './pages/blog/blog';
import { BlogDetalle } from './pages/blog-detalle/blog-detalle';
import { Contactanos } from './pages/contactanos/contactanos';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Servicios } from './pages/servicios/servicios';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: Inicio
  },
  {
    path: 'nosotros',
    component: Nosotros
  },
  {
    path: 'servicios',
    component: Servicios
  },
  {
    path: 'blog/:id',
    component: BlogDetalle
  },
  {
    path: 'blog',
    component: Blog
  },
  {
    path: 'contactanos',
    component: Contactanos
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
