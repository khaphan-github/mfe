// TOTO: Lưu dữ liệu khi user còn thao tác trên web thoát thì mất.
export const SessionStorageConfigKeys = {
  global: {},
  features: {
    noi_quy_lao_dong: {
      nghi_pheps: {
        filter: 'features.noi_quy_lao_dong.nghi_pheps.filters.filter',
        currentItem: 'features.noi_quy_lao_dong.nghi_pheps.currentItem',
      },
      tree_process: {
        status: 'features.noi_quy_lao_dong.tree_process.status',
      },
      hoc_tap_cong_tacs: {
        filter: 'features.noi_quy_lao_dong.hoc_tap_cong_tacs.filters.filter',
        currentItem: 'features.noi_quy_lao_dong.hoc_tap_cong_tacs.currentItem',
      },
      thong_ke_nghi_theo_tung_loai: {
        filter: 'features.noi_quy_lao_dong.thong_ke_nghi_theo_tung_loai.filters.filter',
        currentItem: 'features.noi_quy_lao_dong.thong_ke_nghi_theo_tung_loai.currentItem',
      },
      cai_dat: {
        don_vi: {
          list: 'features.noi_quy_lao_dong.noi_quy_lao_dong.cai_dat.don_vi.list'
        }
      },
      quan_ly: {
        quy_dinh: {
          canh_cao_sai_pham: {
            filter: 'feature.noi_quy_lao_dong.quan_ly.quy_dinh.canh_cao_sai_pham.filter',
          },
        }
      },
    }
  }
}
