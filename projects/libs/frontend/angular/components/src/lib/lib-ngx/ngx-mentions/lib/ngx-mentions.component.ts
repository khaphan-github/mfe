import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

import { HighlightTag, TagMouseEvent } from './text-input-highlight';
import { ChoiceWithIndices, IValueOutputMention } from './ngx-mentions.interface';

@Component({
  selector: 'ngx-mentions',
  templateUrl: './ngx-mentions.component.html',
})
export class NgxMentionsComponent implements OnInit{

  @Input() mentionsConfig!: {
    /**
    * The character that will trigger the menu to appear
    */
    triggerCharacter: string,
    /**
    * A function that formats the selected choice once selected.
    * The result (label) is also used as a choice identifier (e.g. when editing choices)
    */
    getChoiceLabel: (choice: any) => string,
  }[];

  /**
   * Reference to the text input element
   */
  @Input() textInputElement!: HTMLTextAreaElement | HTMLInputElement;

  /**
   * Reference to the menu template
   */
  @Input() menuTemplate!: TemplateRef<any>;

  /**
   * The regular expression that will match the search text after the trigger character
   */
  @Input() searchRegexp = /^\w*$/;

  /**
   * Whether to close the menu when the host textInputElement loses focus
   */
  @Input() closeMenuOnBlur = false;

  /**
   * Whether to remove whole tag on backspace
   */
  @Input() removeWholeTagOnBackspace = true;

  /**
   * Selected choices (required in editing mode in order to keep track of choices)
   */
  selectedChoices: any[] = [];

  /**
   * Toggle the refreshTagHighlighting value to refresh the tag highlight if in case it didn't sync.
   */
  @Input() refreshTagHighlighting!: boolean;

  /**
   * Called when the options menu is shown
   */
  @Output() menuShow = new EventEmitter();

  /**
   * Called when the options menu is hidden
   */
  @Output() menuHide = new EventEmitter();

  /**
   * Called when a choice is selected
   */
  @Output() choiceSelected = new EventEmitter<ChoiceWithIndices>();

  /**
   * Called when a choice is removed
   */
  @Output() choiceRemoved = new EventEmitter<ChoiceWithIndices>();

  /**
   * Called when a choice is selected, removed, or if any of the choices' indices change
   */
  @Output() selectedChoicesChange = new EventEmitter<ChoiceWithIndices[]>();

  /**
   * Called on user input after entering trigger character. Emits search term to search by
   */
  @Output() search = new EventEmitter<{ searchText: string; triggerCharacter: string }>();

  // --- text-input-highlight.component inputs/outputs ---
  /**
   * The CSS class to add to highlighted tags
   */
  @Input() tagCssClass = '';

  /**
   * Called when the area over a tag is clicked
   */
  @Output() tagClick = new EventEmitter<TagMouseEvent>();

  /**
   * Called when the area over a tag is moused over
   */
  @Output() tagMouseEnter = new EventEmitter<TagMouseEvent>();

  /**
   * Called when the area over the tag has the mouse is removed from it
   */
  @Output() tagMouseLeave = new EventEmitter<TagMouseEvent>();

  /**
   * Array of mentions with the tag level class name if required
   */
  @Input() mentions: HighlightTag[] = [];


  /**
   * @author chungnguyen
   * Trả về giá trị của nguyên element
   */
  @Output() valueChanged = new EventEmitter<IValueOutputMention>();

  /**
   * @author chungnguyen
   * Giá trị ban đầu của element
   */
  @Input() initValue: IValueOutputMention = {
    text: "",
    mentions: []
  };

  ngOnInit(): void {
    this.textInputElement.value = this.initValue.text;
    this.selectedChoices = this.initValue.mentions;
  }

}
