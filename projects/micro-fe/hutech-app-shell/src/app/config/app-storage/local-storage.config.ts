/**
 * Cấu hình khóa Local Storage cho lưu trữ dữ liệu.
 * Yêu cầu:
 *  - Cần đặt tên khóa đúng cú pháp để tránh sự trùng lặp tên khóa.
 *  - Cần viết mô tả cho khóa đã khai báo:
 *    vd: // Khóa lưu trữ <Nội dung thông tin> trong chức năng <Tên chức năng>
 *  - Cần quy hoạch khóa dựa theo chức năng (feature) hoặc toàn ứng dung (global):
 *  - Xem mẫu ở dưới nhé!!!
 * */
export const LocalStorageConfigKeys = {
  global: {
    transloco: {
      // Khóa lưu trữ ngôn ngữ hiện tại của Transloco.
      currentLanguage: 'global.transloco.currentLangulage',
    },
    routing: {
      // Khóa lưu trữ URL trước đó trong định tuyến sau khi login thành công.
      previousUrl: 'global.routing.previousUrl',
      devPreviousUrl: 'global.routing.devPreviousUrl',
    },
  },
  feature: {
    auth: {
      //  Khóa lưu trữ thông tin người dùng trong chức năng xác thực.
      userInformation: 'feature.auth.user',
      //  Khóa lưu trữ mã thông báo truy cập trong chức năng xác thực.
      accessToken: 'feature.auth.token',
      // Khóa lưu trữ danh sách các ID hành động trong chức năng xác thực.
      actionIds: 'feature.auth.actionIds',
    },

    layouts: {
      tabSetting: {
        themeMode: 'feature.layouts.tabSetting.themeMode',
      },
      themeSetting: 'feature.layouts.themeSetting',
    },

    noi_quy_lao_dong: {
      dang_ky_het_hieu_luc: {
        filters: 'feature.noi_quy_lao_dong.dang_ky_het_hieu_luc.filters',
      },

      quan_ly_sai_pham_giai_trinh: {
        filters: 'feature.noi_quy_lao_dong.quan_ly_sai_pham_giai_trinh.filters',
      },

      thoi_gian_lam_viecs: {
        // Khóa lưu trữ trạng thái filter hiện tại trong chức năng thời gian làm việc
        filters: 'feature.noi_quy_lao_dong.tglvs.filters',
      },

      hoc_tap_cong_tacs: {
        // Khóa lưu trữ tổng số dòng hiển thị trong chức năng thời gian làm việc
        itemPerPage: 'feature.noi_quy_lao_dong.hoc_tap_cong_tacs.itemPerPage',
        // Khóa lưu trữ trạng thái filter hiện tại trong chức năng thời gian làm việc
        filters: 'feature.noi_quy_lao_dong.hoc_tap_cong_tacs.filters',
      },

      quan_ly_tra_cuu_nqld: {
        filters: 'feature.noi_quy_lao_dong.quan_ly_tra_cuu_nqld.filters',
      },

      quan_ly_tra_cuu_sai_pham_chua_giai_trinh: {
        filters: 'feature.noi_quy_lao_dong.quan_ly_tra_cuu_sai_pham_chua_giai_trinh.filters',
      },

      tra_cuu_sai_pham: {
        filters: 'feature.noi_quy_lao_dong.tra_cuu_sai_pham.filters',
      },

      overview: {
        quan_ly: {
          don_vi_list: "feature.noi_quy_lao_dong.overview.quan_ly.don_vi_list",
        }
      },

      dang_ky_thoi_gian_lam_viec: {
        filters: 'feature.noi_quy_lao_dong.dang_ky_thoi_gian_lam_viec.filters',
      },

      nghi_pheps: {
        // Khóa lưu trữ tổng số dòng hiển thị trong chức năng quản lý
        itemPerPage: 'feature.noi_quy_lao_dong.nghi_pheps.itemPerPage',
        // Khóa lưu trữ trạng thái filter hiện tại trong chức năng quản lý
        filters: 'feature.noi_quy_lao_dong.nghi_pheps.filters',
      },

      ca_nhan: {
        cham_cong: {
          // Khóa lưu trữ trạng thái filter hiện tại trong chức năng quản lý chấm công
          filters: 'feature.noi_quy_lao_dong.ca_nhan.cham_cong.filters',
        },
        sai_pham_giai_trinh: {
          filters: 'feature.noi_quy_lao_dong.ca_nhan.sai_pham_giai_trinh.filters',
        },
      },

      quan_ly: {
        cham_cong: {
          quan_ly_cham_cong: {
            // Khóa lưu trữ trạng thái filter hiện tại trong chức năng quản lý chấm công
            filters: 'feature.noi_quy_lao_dong.quan_ly.cham_cong.quan_ly_cham_cong.filters',
          },
        },
        dang_ky_ho: {
          filters: "feature.noi_quy_lao_dong.quan_ly.dang_ky_ho.filters",
        },
        quy_dinh: {
          khung_gio_lam: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.khung_gio_lam.filter',
          },
          // Khóa lưu trữ trạng thái filter hiện tại trong chức năng quản lý quy định chế độ nghỉ phép
          loai_che_do: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.che_do.filter'
          },
          buoi_lam_viec: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.buoi_lam_viec.filter',
          },
          khung_gio_lam_nhan_vien: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.khung_gio_lam_nhan_vien.filter',
          },
          su_kien_nghi_dot_xuat: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.su_kien_nghi_dot_xuat.filter',
          },
          chinh_sach_rieng_nhan_vien: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.chinh_sach_rieng_nhan_vien.filter',
          },
          tham_nien_cong_tac: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.tham_nien_cong_tac.filter',
          },
        }
      }
    },
  },
};
