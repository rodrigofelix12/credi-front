# Copilot Instructions for CrediFront

## Project Overview

**CrediFront** is an Angular 21 standalone components application for managing customer ("clientes") data. It follows Angular's modern standalone API with lazy-loaded page components, using Material Design for the UI and RxJS for reactive data management.

## Architecture

### Core Structure
- **App Bootstrap**: [src/app/app.component.ts](src/app/app.component.ts) — Root component with `<router-outlet>`
- **App Configuration**: [src/app/app.config.ts](src/app/app.config.ts) — Standalone app providers (router + error listeners)
- **Routing**: [src/app/app.routes.ts](src/app/app.routes.ts) — Lazy-loaded page routes with MainLayout wrapper
- **Core Services**: [src/app/core/services/](src/app/core/services/) — Business logic (ClienteService for API calls)
- **Core Models**: [src/app/core/models/](src/app/core/models/) — TypeScript interfaces (Cliente)
- **Layout**: [src/app/layout/main-layout/](src/app/layout/main-layout/) — Shared sidenav container with Material toolbar
- **Pages**: [src/app/pages/clientes/](src/app/pages/clientes/) — Routed components (list, form)

### Key Data Flow
1. Pages import `ClienteService` directly (no dependency injection needed beyond constructor injection)
2. Services use `HttpClient` to call backend at `http://localhost:8080`
3. Components use `@angular/forms` (ReactiveFormsModule) for form handling
4. Lazy loading happens in routes: `.then(c => c.ComponentExport)` pattern

## Important Patterns & Conventions

### Standalone Components
- All components use `standalone: true` with explicit `imports` array
- Example: [src/app/pages/clientes/clientes-list/clientes-list.ts](src/app/pages/clientes/clientes-list/clientes-list.ts)
- DO NOT use `NgModule` declarations

### Angular Material
- Imported component-by-component in `imports` (e.g., `MatTableModule`, `MatFormField`)
- Material theming: [src/material-theme.scss](src/material-theme.scss)
- Sidenav pattern used in MainLayout with `MatSidenavContainer` + `MatNavList`

### Service Layer Pattern
- Services marked with `@Injectable({providedIn: 'root'})` for tree-shaking
- HTTP endpoints constructed as: `${this.api}/resource`
- Return observables directly (components handle `.subscribe()`)
- Example: [src/app/core/services/cliente.service.ts](src/app/core/services/cliente.service.ts)

### Form Handling
- Use `FormBuilder` to construct `FormGroup` in `ngOnInit()`
- Pattern: `this.formBuilder.group({field: ['', Validators.required]})`
- Distinguish edit vs. create via route param: `this.route.snapshot.paramMap.get('id')`
- Use `.patchValue()` to populate form when editing; use `.value` to get form data

### Routing Conventions
- Nested routes under MainLayout component
- List routes: `/clientes`
- Create routes: `/clientes/novo`
- Edit routes: `/clientes/:id/editar`
- Navigation via `Router.navigate(['path', param])`

## Development Workflow

### Starting Development
```bash
npm start        # Runs ng serve on http://localhost:4200
npm test         # Runs vitest for unit tests
npm build        # Production build to dist/
npm run watch    # Watch mode during development
```

### Testing
- Test files follow pattern: `*.spec.ts`
- Test runner: **Vitest** (not Karma)
- Example test structure in [src/app/pages/clientes/clientes-list/clientes-list.spec.ts](src/app/pages/clientes/clientes-list/clientes-list.spec.ts)

### Code Scaffolding
```bash
ng generate component feature-name      # Creates standalone component
ng generate service core/services/name  # Creates injectable service
```

## Critical Integration Points

### Backend API
- Base URL: `http://localhost:8080` (hardcoded in ClienteService)
- Endpoints:
  - `GET /clientes` — List all customers
  - `GET /clientes/:id` — Fetch customer by ID
  - `POST /clientes` — Create customer
  - `PUT /clientes/:id` — Update customer
- **Bug Note**: `PUT` endpoint in service incorrectly uses `{id}` placeholder instead of `${id}`

### Prettier Formatting
- Print width: 100 chars
- Single quotes for `.ts` files
- Angular HTML parser for `.html` files
- Run via `prettier --write .`

### Package Manager
- Locked to **npm@10.9.3**
- Use `npm install` only; do not use yarn/pnpm

## When Adding Features

1. **New Page**: Create component in `src/app/pages/`, add route to `app.routes.ts`, use lazy loading
2. **New Service**: Place in `src/app/core/services/`, use `@Injectable({providedIn: 'root'})`
3. **New Model**: Define interface in `src/app/core/models/`
4. **Form Component**: Use `ReactiveFormsModule` + `FormBuilder` pattern from `cliente-form.ts`
5. **Data Display**: Use `MatTableDataSource` (as in `clientes-list.ts`) for paginated/sortable tables

## Key Files Reference

| File | Purpose |
|------|---------|
| [src/main.ts](src/main.ts) | App bootstrap entry |
| [src/app/app.routes.ts](src/app/app.routes.ts) | Route configuration |
| [src/app/layout/main-layout/main-layout.ts](src/app/layout/main-layout/main-layout.ts) | Shared UI shell |
| [src/app/core/services/cliente.service.ts](src/app/core/services/cliente.service.ts) | API client |
| [angular.json](angular.json) | CLI build configuration |
