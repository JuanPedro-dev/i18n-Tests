import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin, catchError, of } from 'rxjs';

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