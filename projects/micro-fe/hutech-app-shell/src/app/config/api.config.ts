import { environment } from './environments/environment';

export const API_ENDPOINTS = {
  auth: `${environment.domain.apiAuth}`, // <<-- API AUTH

  //#region NỘI QUY LAO ĐỘNG
  noi_quy_lao_dong_don_vi: `${environment.domain.apiNoiQuyLaoDong}/syn-don-vi`,
  noi_quy_lao_dong_contact_profile: `${environment.domain.apiNoiQuyLaoDong}/syn-contact-profile`,
  noi_quy_lao_dong_syn_tham_nien_ct: `${environment.domain.apiNoiQuyLaoDong}/syn-tham-nien-cong-tac`,
  noi_quy_lao_dong_nam_hoc: `${environment.domain.apiNoiQuyLaoDong}/nam-hoc`,
  noi_quy_lao_dong_sai_pham: `${environment.domain.apiNoiQuyLaoDong}/sai-pham`,
  noi_quy_lao_dong_thoi_gian_lam_viec: `${environment.domain.apiNoiQuyLaoDong}/tglv`,
  noi_quy_lao_dong_khung_gio_lam_nhan_vien: `${environment.domain.apiNoiQuyLaoDong}/tglv/khung-gio-lam/config/user`,
  noi_quy_lao_dong_khung_gio_lam_config: `${environment.domain.apiNoiQuyLaoDong}/tglv/khung-gio-lam/config`,
  noi_quy_lao_dong_khung_gio_lam: `${environment.domain.apiNoiQuyLaoDong}/tglv/khung-gio-lam`,
  noi_quy_lao_dong_buoi_lam_viec: `${environment.domain.apiNoiQuyLaoDong}/tglv/buoi/config`,
  noi_quy_lao_dong_che_do: `${environment.domain.apiNoiQuyLaoDong}/tglv/che-do`,
  noi_quy_lao_dong_loai_nghi_phep: `${environment.domain.apiNoiQuyLaoDong}/tglv/che-do`,
  noi_quy_lao_dong_su_kien_nghi_dot_xuat: `${environment.domain.apiNoiQuyLaoDong}/tglv/nghi-dot-xuat`,
  noi_quy_lao_dong_chinh_sach_rieng_nhan_vien: `${environment.domain.apiNoiQuyLaoDong}/tglv/che-do/admin`,
  noi_quy_lao_dong_sai_pham_config: `${environment.domain.apiNoiQuyLaoDong}/sai-pham/config`,
  noi_quy_lao_dong_cham_cong: `${environment.domain.apiNoiQuyLaoDong}/cham-cong`,
  noi_quy_lao_dong_tra_cuu: `${environment.domain.apiNoiQuyLaoDong}/tra-cuu`,
  noi_quy_lao_dong_overview: `${environment.domain.apiNoiQuyLaoDong}/overview`,
  noi_quy_lao_dong_tham_nien_cong_tac: `${environment.domain.apiNoiQuyLaoDong}/tham-nien-cong-tac`,

  //Nhóm api module dùng trong nhiều project khác
  noi_quy_lao_dong_approve_request: `${environment.domain.apiNoiQuyLaoDong}/approve-request`,
  noi_quy_lao_dong_thong_ke: `${environment.domain.apiNoiQuyLaoDong}/thong-ke`,
  noi_quy_lao_dong_file: `${environment.domain.apiNoiQuyLaoDong}/file-v2`,

  // Nhóm API Cài đặt: Profile, đơn vị, system setting, tag... Bộ module clone cho mọi project
  noi_quy_lao_dong_cai_dat_tai_khoan: `${environment.domain.apiNoiQuyLaoDong}/tai-khoan`,
  noi_quy_lao_dong_cai_dat_don_vi: `${environment.domain.apiNoiQuyLaoDong}/don-vi`,
  noi_quy_lao_dong_loai_hinh_lao_dong: `${environment.domain.apiNoiQuyLaoDong}/loai-hinh-lao-dong`,
  noi_quy_lao_dong_tinh_trang_lao_dong: `${environment.domain.apiNoiQuyLaoDong}/user-profile/tinh-trang-lao-dong`,
  noi_quy_lao_dong_chuc_vu: `${environment.domain.apiNoiQuyLaoDong}/chuc-vu`,
  noi_quy_lao_dong_don_vi_by_roles: `${environment.domain.apiNoiQuyLaoDong}/don-vi`,

  // Hướng dẫn
  noi_quy_lao_dong_support: `${environment.domain.apiNoiQuyLaoDong}/support`,


  //#endregion

  //#region other
  //...
  //#region
};
