// Note:
// _menu: nếu là các menu
// _act: nếu là các action của button, ...

export const GlobalPolcies = {
  productModule: {
    list: {
      shareButton: 9865,
      notifyButton: 9865
    },
    navigator: 9865
  },
  userModule: {
    list: {

    },
    navigator: 9865
  },
  noiQuyLaoDongModule: {
    nqld: '1120', // web: menu left - Nội quy lao động
    left_menu: {
      ca_nhan: '1117', // web: menu left - Nội quy lao động - Cá nhân
      ca_nhan_menu: {
        nghi_phep: '1102', // web: menu sub - Nội quy lao động - Cá nhân Nghỉ phép
        hoc_tap_cong_tac: '1101', // web: menu sub - Nội quy lao động - Cá nhân Học tập - Công tác
        thoi_gian_lam_viec: '1100', // web: menu sub - Nội quy lao động - Cá nhân Thời gian làm việc
        sai_pham: '1099', // web: menu sub - Nội quy lao động - Cá nhân Sai phạm
        cham_cong: '1098', // web: menu sub - Nội quy lao động - Cá nhân Chấm công
        overview: '1104' // web: menu sub - Nội quy lao động - Cá nhân Overview
      },
      quan_ly: '1116', // web: menu left - Nội quy lao động - Quản lý
      quan_ly_menu: {
        tra_cuu_cham_cong: '1113', // web: menu sub - Nội quy lao động - Quản lý - Tra cứu Chấm công
        tra_cuu_noi_quy: '1112', // web: menu sub - Nội quy lao động - Quản lý - Tra cứu Nội quy
        tra_cuu_sai_pham: '1111', // web: menu sub - Nội quy lao động - Quản lý - Tra cứu Sai phạm
        ky_duyet_dang_ky: '1110', // web: menu sub - Nội quy lao động - Quản lý - Ký duyệt Đăng ký
        ky_duyet_giai_trinh_sp: '1109', // web: menu sub - Nội quy lao động - Quản lý - Ký duyệt Giải trình sai phạm
        quy_dinh_buoi_lam_viec: '1108', // web: menu sub - Nội quy lao động - Quản lý - Quy định Buổi làm việc
        quy_dinh_khung_gio_lam: '1107', // web: menu sub - Nội quy lao động - Quản lý - Quy định Khung giờ làm
        quy_dinh_che_do_nghi_phep: '1106', // web: menu sub - Nội quy lao động - Quản lý - Quy định Chế độ nghỉ phép
        quy_dinh_su_kien_nghi_dot_xuat: '1132', // web: menu sub - Nội quy lao động - Quản lý - Sự kiện nghỉ đột xuất
        quy_dinh_khung_gio_lam_nv: '1105', // web: menu sub - Nội quy lao động - Quản lý - Quy định Khung giờ làm nhân viên
        overview: '1103', // web: menu sub - Nội quy lao động - Quản lý Overview
        ghi_nhan_sai_pham: '1122', // web: menu sub - Nội quy lao động - Quản lý - Ghi nhận sai phạm
        tham_nien_cong_tac: '1125', // web: menu sub - Nội quy lao động - Quản lý - Quy định Thâm niên công tác,
        chinh_sach_rieng_cho_nhan_vien: '1126', // web: menu sub - Nội quy lao động - Quản lý - Chính sách riêng cho nhân viên.
        canh_cao_sai_pham: '1133',// 	web: menu sub - Nội quy lao động - Quản lý - Quy định Cảnh báo sai phạm
        dang_ky_ho: '1134',// 	web: menu sub - Nội quy lao động - Quản lý - Đăng ký hộ
        dang_ky_het_hieu_luc: '1135'// 	web: menu sub - Nội quy lao động - Quản lý - Đăng ký hết hiệu lực
      },
      thong_ke: '1115', // web: menu left - Nội quy lao động - Thống kê
      cai_dat: '1119', // web: menu left - Nội quy lao động - Cài đặt
      cai_dat_tai_khoan: '1118', // web: menu left - Nội quy lao động - Cài đặt - Tài khoản
      cai_dat_don_vi: '1123',// web: menu left - Nội quy lao động - Cài đặt - Đơn vị
      huong_dan: '1114',// web: menu left - Nội quy lao động - Hướng dẫn sử dụng

    },
    quan_ly: {
      overview: {
        ky_duyet_can_xu_ly: '1127', // web: Feature - Nội quy lao động - Quản lý - Overview ký duyệt cần xử lý
        ky_duyet_can_admin_xu_ly: '1128', // web: Feature - Nội quy lao động - Quản lý - Overview ký duyệt cần Admin xử lý
        tinh_hinh_nghi_don_vi: '1129', // web: Feature - Nội quy lao động - Quản lý - Overview tình hình nghỉ đơn vị
      }
    },
    huong_dan_act: {
      user: '1130', // web: action - Nội quy lao động - Hướng dẫn - User
      admin: '1131', // web: action - Nội quy lao động - Hướng dẫn - Admin
    }
  }
}

