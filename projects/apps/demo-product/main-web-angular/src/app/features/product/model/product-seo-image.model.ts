

export class HinhAnhSanPham {
  anh_dai_dien!: Array<string>;
  bo_suu_tap!: Array<string>;

  constructor(args?: any) {
    const {
      anh_dai_dien = [],
      bo_suu_tap = []

    } = args || {};
    this.anh_dai_dien = anh_dai_dien;
    this.bo_suu_tap = bo_suu_tap;
  }

  setAnhDaiDien(data: Array<string>) {
    this.anh_dai_dien = data;
  }

  setBoSuuTap(data: Array<string>) {
    this.bo_suu_tap = data;
  }

  setter(data: any) {
    this.anh_dai_dien = data.anh_dai_dien;
    this.bo_suu_tap = data.bo_suu_tap;
  }

  /**
   * Ánh xạ dữ liệu từ server thành HinhAnhSanPham model.
   *
   * @param response Dữ liệu trẩ về từ server.
   */
  setDataByResponse = (response: any) => {
    return response as HinhAnhSanPham;
  }

}

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

  /**
   * Ánh xạ dữ liệu từ server thành HinhAnhSanPham model.
   *
   * @param response Dữ liệu trẩ về từ server.
   */
  setDataByResponse = (response: any) => {
    return response as SEO;
  }
}
