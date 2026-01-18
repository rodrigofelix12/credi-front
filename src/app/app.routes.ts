import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/clientes-list/clientes-list')
        .then(c => c.ClientesList)
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
  {path: '', redirectTo: 'clientes', pathMatch: 'full'},
  {path: '**', redirectTo: 'clientes'}
];
