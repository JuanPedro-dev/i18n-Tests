# I18n POC - ngx-translate

On this branch I'm going to implement ngx-translate [Link](https://github.com/ngx-translate/core)

## Steps

1. Install dependency
```
npm install @ngx-translate/core --save
```
2. Add folder and files to use as dictionary: here will have the key/values

assets/i18n/dev.json

3. Inject configs on init app. Paste on app.config.ts 

```js

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot()
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [HttpClient, TranslateService],
      multi: true
    }
  ],
};

export function initApp(http: HttpClient, translate: TranslateService) {
  return () => new Promise<boolean>((resolve: (res: boolean) => void) => {

    const defaultLocale = 'en';
    const translationsUrl = '/assets/i18n/translations';
    const sufix = '.json';
    const storageLocale = localStorage.getItem('locale');
    const locale = storageLocale || defaultLocale;

    forkJoin([
      http.get(`/assets/i18n/dev.json`).pipe(
        catchError(() => of(null))
      ),
      http.get(`${translationsUrl}/${locale}${sufix}`).pipe(
        catchError(() => of(null))
      )
    ]).subscribe((response: any[]) => {
      const devKeys = response[0];
      const translatedKeys = response[1];

      translate.setTranslation(defaultLocale, devKeys || {});
      translate.setTranslation(locale, translatedKeys || {}, true);

      translate.setDefaultLang(defaultLocale);
      translate.use(locale);

      resolve(true);
    });
  });
}
```

4. Now we are going to replace each text, and create a key/value con dev.json

```json
{
    "navbar.menu.home": "Home",
    "navbar.menu.languages": "Languages",
    "navbar.menu.languages.Spanish": "Spanish",
    "navbar.menu.languages.English": "English",
    "navbar.menu.search.input": "Ex. User",
    "navbar.menu.search.search": "Ex. User",
    "main.page.hero.title": "Responsive left-aligned hero with image",
    "main.page.hero.txt": "Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.",
    "main.page.hero.btn": "Click me, I'm a button"
}
```
5. Create one json for each language, Example Spanish (es.json):

```json
{
    "navbar.menu.home": "Inicio",
    "navbar.menu.languages": "Idiomas",
    "navbar.menu.languages.Spanish": "Español",
    "navbar.menu.languages.English": "Inglés",
    "navbar.menu.search.input": "Ejemplo: usuario",
    "navbar.menu.search.search": "Buscar",
    "main.page.hero.title": "Héroe responsivo alineado a la izquierda con imagen",
    "main.page.hero.txt": "Diseñe y personalice rápidamente sitios web con capacidad de respuesta y orientados primero a dispositivos móviles con Bootstrap, el conjunto de herramientas de código abierto para front-end más popular del mundo, que incluye variables y mixins de Sass, un sistema de cuadrícula con capacidad de respuesta, un gran número de componentes predefinidos y potentes plugins de JavaScript.",
    "main.page.hero.btn": "Hazme clic, soy un botón"
}
```

6. Replace each text in each different html

Example: 
```html
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Spanish</a></li>
            <li><a class="dropdown-item" href="#">English</a></li>
          </ul>
```

```html
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">{{'navbar.menu.languages.Spanish' | translate}}</a></li>
            <li><a class="dropdown-item" href="#">{{'navbar.menu.languages.English' | translate}}</a></li>
          </ul>
```

7. Add a method to change the language, like on navbar

```ts
public changeLanguage(code: string) {
  localStorage.setItem('locale', code);
  window.location.reload();
}
```

```html
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" (click)="changeLanguage('en')">Spanish</a></li>
            <li><a class="dropdown-item" href="#" (click)="changeLanguage('es')">English</a></li>
          </ul>
```

8. Add the "TranslateModule" on each component that use | translate



<hr>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
