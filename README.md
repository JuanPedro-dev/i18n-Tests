# I18n POC - Transloco

Oficial link [Transloco](https://ngneat.github.io/transloco/docs/getting-started/installation)

## Steps:  

1. Install dependency
```
ng add @ngneat/transloco
```
🌍 Which languages do you need? (en, es) > enter o add several languages 
🚀 Are you working with server side rendering? > in this case no

this will create the files on assets/i18n => en.json and es.json

Similar to ngx-translate, we need to create on this files key/values to access later. 

2. Add provides app.config.ts

```js
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@ngneat/transloco';

import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideTransloco({
            config: {
                availableLangs: ['en', 'es'],
                defaultLang: 'en',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoader
        })
    ]
};

```

3. Replace each text with the keys and add transloco pipe. Example: 

```html
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Spanish</a></li>
            <li><a class="dropdown-item" href="#">English</a></li>
          </ul>
```


```html
          <ul class="dropdown-menu">
            <li><span class="dropdown-item" href="#" >{{'navbar.menu.languages.English' | transloco}}</span></li>
            <li><span class="dropdown-item" href="#" >{{'navbar.menu.languages.Spanish' | transloco}}</span></li>
          </ul>
```

4. Add some method to change the value of language, in this case y use a dropdown of navbar menu

```html
          <ul class="dropdown-menu">
            <li><span class="dropdown-item" href="#" (click)="changeLanguage('en')">{{'navbar.menu.languages.English' | transloco}}</span></li>
            <li><span class="dropdown-item" href="#" (click)="changeLanguage('es')">{{'navbar.menu.languages.Spanish' | transloco}}</span></li>
          </ul>

```
5. Add TranslocoModule on each component that use transloco pipe

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
