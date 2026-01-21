import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { ClientesResolver } from './core/resolvers/clientes.resolver';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/clientes/clientes-list/clientes-list')
            .then(c => c.ClientesList),
        resolve: {
          clientes: ClientesResolver
        }
      },
      {
        path: 'clientes/novo',
        loadComponent: () =>
          import('./pages/clientes/cliente-form/cliente-form')
            .then(c => c.ClienteForm)
      },
      {
        path: 'clientes/:id/editar',
        loadComponent: () =>
          import('./pages/clientes/cliente-form/cliente-form')
            .then(c => c.ClienteForm)
      },
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
