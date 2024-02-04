export enum TranslocoConfigVariable {
  defaultLanguage = 'vi',
  i18nAssetsPath = '/assets/i18n/', // {lang}.json
}

// Use to display languages application provice
export const TranslocoAvailableLanguages = [
  { id: 'es', name: 'layouts.appUserMenu.language.english' },
  { id: 'vi', name: 'layouts.appUserMenu.language.vietnamese' },
  { id: 'ch', name: 'layouts.appUserMenu.language.chinese' },
  { id: 'jpn', name: 'layouts.appUserMenu.language.japanese' }
]
