import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl } from '@angular/material/paginator';

const customMatPaginatorIntl = new MatPaginatorIntl();
customMatPaginatorIntl.itemsPerPageLabel = 'Itens por página:';
customMatPaginatorIntl.nextPageLabel = 'Próxima página';
customMatPaginatorIntl.previousPageLabel = 'Página anterior';
customMatPaginatorIntl.firstPageLabel = 'Primeira página';
customMatPaginatorIntl.lastPageLabel = 'Última página';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSizeOptions: [5, 10, 25],
        showFirstLastButtons: true
      }
    },
    {
      provide: MatPaginatorIntl,
      useValue: customMatPaginatorIntl
    }
  ]
};
