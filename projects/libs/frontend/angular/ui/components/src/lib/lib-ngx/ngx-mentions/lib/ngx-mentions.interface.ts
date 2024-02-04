export interface ChoiceWithIndices {
  choice: any;
  indices: {
    start: number;
    end: number;
    triggerCharacter: string
  };
  cssClass?: string;
}

export interface IValueOutputMention {
  text: string,
  mentions: ChoiceWithIndices[],
  template?: string
}
