import { TPlugins, TTinyMCE, TToolbar } from './tinyMCE.type';

enum EOptions {
  plugins = 'plugins',
  toolbar = 'toolbar',
  init = 'init',
}

const DEFAULT_TINYMCE: TTinyMCE = {
  apiKey: 'no-api-key',
  disabled: false,
  cloudChannel: '6',
  plugins: [],
  toolbar: [],
  outputFormat: 'html',
  init: {
    // core
    height: 500,
    toolbar_sticky: false,
    toolbar_sticky_offset: 0,
    autosave_ask_before_unload: true,
    autosave_interval: '5s',
    autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
    autosave_retention: '20m',
    autosave_restore_when_empty: false,
    // image
    image_title: true,
    image_advtab: true,
    image_caption: true,
    file_picker_types: ['image', 'file', 'media'],
    automatic_uploads: true,
    // quickbars
    quickbars_selection_toolbar: ['bold italic underline strikethrough'],
    // toolbar
    toolbar_mode: 'sliding',
    // mode
    skin: 'oxide',
    content_css: 'default',
    // style
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  },
};

const FullPlugins: TPlugins[] = [
  'preview',
  'importcss',
  'searchreplace',
  'autolink',
  'autosave',
  'save',
  'directionality',
  'code',
  'visualblocks',
  'fullscreen',
  'image',
  'link',
  'media',
  'template',
  'codesample',
  'table',
  'charmap',
  'pagebreak',
  'nonbreaking',
  'anchor',
  'insertdatetime',
  'advlist',
  'lists',
  'wordcount',
  'help',
  'quickbars',
  'emoticons',
];

const FullToolbar: TToolbar[] = [
  'undo redo',
  'bold italic underline strikethrough',
  'fontfamily fontsize blocks',
  'alignleft aligncenter alignright alignjustify',
  'outdent indent',
  'numlist bullist',
  'forecolor backcolor removeformat',
  'pagebreak',
  'charmap emoticons',
  'fullscreen  preview save print',
  'insertfile image media template link anchor codesample',
  'ltr rtl',
  'fontsizeinput',
  'code styles table',
];

const FullFontSize: string[] = [
  '1em',
  '2em',
  '4em',
  '6em',
  '8em',
  '10em',
  '12em',
  '14em',
  '16em',
  '18em',
  '20em',
  '24em',
];

const FullFontFamilyFormats =
  'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats';

export {
  DEFAULT_TINYMCE,
  EOptions,
  FullPlugins,
  FullToolbar,
  FullFontSize,
  FullFontFamilyFormats,
};
