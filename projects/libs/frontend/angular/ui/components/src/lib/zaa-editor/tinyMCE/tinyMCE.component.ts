import {
  AppStorageService,
  StorageLocation,
} from '@core/app-store/app-storage.service';
import { TabSettingService } from './../../../../layouts/_include/page-setting/tab-setting/tab-setting.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { EventObj } from '../tinyMCE-lib/editor/Events';
import { Editor } from '../tinyMCE-lib/editor/tinymce';
import { TInit, TTinyMCE } from './tinyMCE.type';
import { DEFAULT_TINYMCE, EOptions } from './tinyMCE.variables';
@Component({
  selector: 'tinyMCE',
  templateUrl: './tinyMCE.component.html',
  styleUrls: ['./tinyMCE.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TinyMCEComponent implements OnInit {
  /*-----------------------------------DECLARATION SCOPE-----------------------------------*/

  private currentMode: string = '';
  private _editor!: Editor;
  protected isLoading: boolean = false;
  protected _options!: TTinyMCE;
  protected _plugins: string = '';
  protected _toolbar: string = '';
  protected _init: TInit & {
    menubar?: string;
    file_picker_types?: string;
    font_size_formats?: string;
  } = {};

  /*-----------------------------------SETTER/GETTER SCOPE-----------------------------------*/

  /**
   * Get the options.
   *
   * @return {TTinyMCE} The options.
   */
  @Input() get options() {
    return this._options;
  }

  /**
   * Sets the options for the function.
   *
   * @param {TTinyMCE} value - The value of the options to be set.
   */
  set options(value) {
    if (!value) return;
    this._options = value;
    for (const key of Object.keys(DEFAULT_TINYMCE)) {
      if (!!!this._options[key]) {
        this._options[key] = DEFAULT_TINYMCE[key];
      } else {
        this.handleSetOptions(key, this._options[key]);
      }
    }
  }

  // Nội dung của editor
  @Input() editorContent: string = '';

  // 2 way binding
  @Output() editorContentChange = new EventEmitter<string>();

  // Khi khởi tạo component sẽ bắn đi instance
  @Output() onInitEditor = new EventEmitter<Editor>();

  /*-----------------------------------LIFECYCLE HOOKS SCOPE-----------------------------------*/

  constructor(
    private tabSettingService: TabSettingService,
    private storage: AppStorageService
  ) {}

  ngOnInit(): void {
    // Khởi tạo lắng nghe sự kiện file open
    this.handleFilePicker();

    // Func thiết lập theme
    this.handleSetThemeMode();
  }

  /**
   * Destroys the component.
   *
   * @return {void} No return value.
   */
  ngOnDestroy(): void {
    if (this._editor) {
      this._editor.destroy();
    }
  }

  /*-----------------------------------SETUP SCOPE-----------------------------------*/

  /**
   * Handle setting options for the configuration based on the given key and value.
   * @param key - The key of the option to set.
   * @param value - The value to set for the option.
   */
  private handleSetOptions(key: string, value: any): void {
    switch (key) {
      case EOptions.plugins: {
        this._plugins = this.handleJoin(value);
        break;
      }
      case EOptions.toolbar: {
        this._toolbar = this.handleJoin(value, '|');
        break;
      }
      case EOptions.init: {
        const {
          menubar,
          quickbars_selection_toolbar,
          file_picker_types,
          font_size_formats,
          ...another
        } = value;
        if (menubar) this._init.menubar = this.handleJoin(menubar);
        if (quickbars_selection_toolbar)
          this._init.quickbars_selection_toolbar = this.handleJoin(
            quickbars_selection_toolbar
          );
        if (file_picker_types)
          this._init.file_picker_types = this.handleJoin(file_picker_types);

        if (font_size_formats)
          this._init.font_size_formats = this.handleJoin(font_size_formats);
        this._init = {
          ...this._init,
          ...another,
        };
        break;
      }

      default: {
        break;
      }
    }
  }

  // This function handles the initialization of the editor instance.
  // It receives an event object containing the editor and event.
  // It assigns the editor to the class property _editor.
  // It emits an event to notify that the editor has been initialized.

  protected handleOnInitEditor(eventObj: EventObj<any>): void {
    // Destructure the event object to get the editor and event
    const { editor, event } = eventObj;

    // Assign the editor to the class property _editor
    this._editor = editor;
    this._editor.contentDocument.activeElement?.classList.add(this.currentMode);

    // Emit the onInitEditor event with the editor as the payload
    this.onInitEditor.emit(editor);
  }

  // Func thiết lập theme
  private handleSetThemeMode(): void {
    this.currentMode = this.storage.getItem(
      this.storage.localStorageKeys.feature.layouts.tabSetting.themeMode,
      { location: StorageLocation.LOCAL_STORAGE }
    );
    this.handleCheckMode(this.currentMode);

    this.tabSettingService
      .getStorageChangeThemeMode()
      .subscribe((mode: string) => {
        this.currentMode = mode;
        this.handleCheckMode(mode);
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1);
      });
  }

  /*-----------------------------------HANDLE SCOPE-----------------------------------*/

  // Func lắng nghe sự kiện thay đổi
  protected handleOnchange(eventObj: EventObj<any>): void {
    const { editor, event } = eventObj;
    const content = editor.getContent();

    this.editorContentChange.emit(content);
    if (content.includes('<img')) {
      const srcList = this.getImagesSrcFromContent(content);
    }
  }

  // Func lấy giá trị của thẻ img từ content
  private getImagesSrcFromContent(content: string): string[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const imgEls = doc.querySelectorAll('img');
    const srcList: string[] = [];

    imgEls.forEach((imgEl) => {
      const src = imgEl.getAttribute('src');
      if (src) srcList.push(src);
    });

    return srcList;
  }

  // Funce mở input chèn từ local
  private handleFilePicker(): void {
    this._init.file_picker_callback = (cb, value, meta) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.addEventListener('change', (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const id = 'blodid' + new Date().getTime();
          const blobCache = this._editor.editorUpload.blobCache;
          const base64 = String(reader.result ?? '').split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      });
      input.click();
    };
  }

  /**
   * Check the theme mode and update related properties.
   * @param currentMode - The current theme mode.
   */
  private handleCheckMode(currentMode: string): void {
    // Determine the skin suffix based on the current mode.
    const skinSuffix = currentMode === 'dark' ? '-dark' : '';

    // Update the skin property with the new value.
    this._init.skin = `oxide${skinSuffix}`;

    // Determine the content theme based on the current mode.
    const contentTheme = currentMode === 'dark' ? 'dark' : 'default';

    // Update the content_css property with the new value.
    this._init.content_css = [
      ...(this._init.src_content_css ?? []),
      contentTheme,
    ];
  }

  /*-----------------------------------FORMAT SCOPE-----------------------------------*/

  /**
   * Joins an array of strings into a single string using a specified symbol as the separator.
   * If no symbol is provided, a space will be used as the default separator.
   *
   * @param value - The array of strings to be joined.
   * @param symbol - The symbol to be used as the separator. Default is a space.
   * @returns The joined string.
   */
  private handleJoin(value: string[], symbol = ' '): string {
    return value.join(symbol) ?? '';
  }
}
