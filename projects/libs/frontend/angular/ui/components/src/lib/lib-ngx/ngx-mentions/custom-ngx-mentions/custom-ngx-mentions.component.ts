import { Component, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMentionsModule } from '@shared/components/lib-ngx/ngx-mentions/lib';
import { ChoiceWithIndices, IValueOutputMention } from '@shared/components/lib-ngx/ngx-mentions/lib/ngx-mentions.interface';

import { lastValueFrom } from 'rxjs';
import _ from 'lodash';
import { CustomNgxMentionsConfig, DisplayList, MentionConfig } from './custom-ngx-mentions.interface';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgxMentionsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-input-with-mentions',
  template: `
    <ngx-mentions [textInputElement]="inputElementTagReference"
      [menuTemplate]="menuTemplate"
      [mentionsConfig]="getNgxMentionConfig()"
      [initValue]="config.initValue ? config.initValue : defaultInitedValue"
      [searchRegexp]="config.searchRegexp ? config.searchRegexp : searchRegexp"
      [mentions]="mentions"
      (valueChanged)="config.valueChanged($event)"
      (search)="loadingChoices($event)"
      (selectedChoicesChange)="onSelectedChoicesChange($event)"
      (tagClick)="config.onclickTag($event)">
    </ngx-mentions>

    <ng-template #menuTemplate let-selectChoice="selectChoice">
      <ngx-text-input-autocomplete-menu
        [choices]="displayList.choices"
        (selectChoice)="selectChoice($event)"
        [displayAtribute]="displayList.displayAttribute"
        [selectorTemplateOutlet]="displayList.template"
        >
      </ngx-text-input-autocomplete-menu>
    </ng-template>
  `,
})
export class InputMentionComponent {
  constructor() { }

  /**
   * Tham chiếu đến phần tử HTML input hoặc textarea để thực hiện mentions.
   */
  @Input('elementRefercence') inputElementTagReference!: HTMLAreaElement | any;

  /**
   * Đối tượng cấu hình để tùy chỉnh hành vi mentions.
   */
  @Input('config') config!: CustomNgxMentionsConfig;

  searchRegexp = new RegExp('^([-&.\\w]+ *){0,3}$');

  mentions: ChoiceWithIndices[] = [];

  selectedChoices: any[] = [];

  displayList: DisplayList = {
    choices: [],
    displayAttribute: '',
  };

  defaultInitedValue: IValueOutputMention = {
    mentions: [],
    text: '',
    template: '',
  }

  /**
   * Hàm gọi lại cho khi danh sách lựa chọn đã chọn thay đổi.
   * @param choices - Danh sách các lựa chọn đã chọn.
   */
  onSelectedChoicesChange(choices: ChoiceWithIndices[]): void {
    this.mentions = choices;
    this.selectedChoices = this.mentions.map((mention) => mention.choice);
  }

  /**
   * Truy xuất các lựa chọn chưa được chọn từ một mảng nguồn.
   * @param selectedChoices - Mảng các lựa chọn đã chọn.
   * @param source - Mảng nguồn chứa tất cả các lựa chọn.
   * @returns Các lựa chọn chưa được chọn.
   */
  getUnSelectedChoices = (selectedChoices: any[], source: any[]) => {
    return source.filter(sourceObj =>
      !selectedChoices.some(selectedChoicesObj => selectedChoicesObj.id === sourceObj.id)
    );
  }

  /**
   * Xử lý việc tải các lựa chọn khi phát hiện triggerCharacter tại ô textarea.
   * @param searchText - Văn bản đang được tìm kiếm.
   * @param triggerCharacter - Ký tự kích hoạt khởi đầu tìm kiếm ví dụ: @, #, $,....
   * @returns Danh sách các lựa chọn khớp.
   */
  loadingChoices = async ({ searchText, triggerCharacter }: { searchText: string; triggerCharacter: string; }) => {
    const configMatched = _.find(this.config.mentionConfig, { triggerCharacter });

    if (configMatched) {
      const { source$, searchByAPI, searchBy, unique, selectorTemplate } = configMatched;

      this.displayList.template = selectorTemplate;
      this.displayList.displayAttribute = searchBy;

      let searchedData = [];

      if (searchByAPI) {
        searchedData = await lastValueFrom(source$(searchText));
      } else {
        const source = await lastValueFrom(source$());
        searchedData = source.filter((item: any) =>
          _.toLower(item[searchBy]).includes(_.toLower(searchText))
        );
      }

      this.displayList.choices = unique
        ? this.getUnSelectedChoices(this.selectedChoices, searchedData)
        : searchedData;
    }

    return this.displayList.choices;
  };

  /**
   * Tạo NgxMentionConfig để cấu hình đề cập.
   * @returns Danh sách các đối tượng NgxMentionConfig.
   */
  getNgxMentionConfig = () => {
    return _.map(this.config.mentionConfig, (value: MentionConfig) => {
      return {
        triggerCharacter: value.triggerCharacter,
        getChoiceLabel: value.getChoiceLabel,
      }
    })
  }
}
