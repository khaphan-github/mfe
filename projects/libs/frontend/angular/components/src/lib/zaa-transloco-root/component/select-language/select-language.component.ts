import { Component, OnInit, inject } from '@angular/core';
import { TranslocoAvailableLanguages, TranslocoConfigVariable } from '../../language/transloco.config';
import { AppStorageService, StorageLocation } from '@erp/angular/logic';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
})
export class SelectLanguageComponent implements OnInit {
  appStorage = inject(AppStorageService);
  private readonly LANGUAGE_STORAGE_KEY = 'lang';
  private readonly STORAGE_LOCATION = { location: StorageLocation.LOCAL_STORAGE, }

  languages: any[] = TranslocoAvailableLanguages;
  currentLanguage: string = TranslocoConfigVariable.defaultLanguage;

  ngOnInit() {
    const currentLanguageInStorage = this.appStorage.getItem(
      this.LANGUAGE_STORAGE_KEY, this.STORAGE_LOCATION,
    ) as string;

    this.currentLanguage = currentLanguageInStorage ?? TranslocoConfigVariable.defaultLanguage;
  }

  onChangeLanguage = (language: string) => {
    this.currentLanguage = language;
    this.appStorage.setItem(this.LANGUAGE_STORAGE_KEY, language, this.STORAGE_LOCATION);
    window.location.reload();
  }
}

