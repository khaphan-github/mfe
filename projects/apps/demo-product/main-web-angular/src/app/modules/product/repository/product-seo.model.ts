export class SEO {
  url_key: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;

  constructor(args?: any) {
    const {
      url_key = "",
      meta_title = "",
      meta_keywords = "",
      meta_description = ""
    } = args || {};
    this.url_key = url_key;
    this.meta_title = meta_title;
    this.meta_keywords = meta_keywords;
    this.meta_description = meta_description;
  }
}
