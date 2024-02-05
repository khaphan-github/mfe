import { HttpClient } from '@angular/common/http';
import {
  Translation,
  TranslocoLoader,
  TranslocoModule,
  provideTransloco,
} from '@ngneat/transloco';
import { inject, Injectable, isDevMode, NgModule } from '@angular/core';
import { TranslocoAvailableLanguages, TranslocoConfigVariable } from './language/transloco.config';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  getTranslation(lang: string) {
    return this.http.get<Translation>(TranslocoConfigVariable.i18nAssetsPath + `${lang}.json`);
  }
}

@NgModule({
  imports: [TranslocoModule],
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: TranslocoAvailableLanguages.map(language => language.id),
        defaultLang: localStorage.getItem('lang')?.replace(/"/g, '')
          || TranslocoConfigVariable.defaultLanguage,
        fallbackLang: TranslocoConfigVariable.defaultLanguage,

        reRenderOnLangChange: true,

        prodMode: !isDevMode(), // TODO: <---- Need to change in production mode (.env)
      },
      loader: TranslocoHttpLoader
    }),
  ]
})
export class TranslocoRootModule { }
