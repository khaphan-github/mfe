//----------------------------- DỮ LIỆU DEFAULT CHO INPUTMASK

enum InputMaskIcons_Enum {
  fa_scanner_touchscreen = 'fa-scanner-touchscreen',
  fa_desktop = 'fa-desktop',
  fa_mouse_pointer = 'fa-mouse-pointer',
  fa_wifi = 'fa-wifi',
  fa_window_alt = 'fa-window-alt',
  fa_desktop_alt = 'fa-desktop-alt',
  fa_car = 'fa-car',
}

const DEFAULT_INPUT_MASK = {
  type: 'mask',
  format: '999-99-999-9999-9',
  hasHelpBlock: false,
  hasIcon: false,
  icon: InputMaskIcons_Enum.fa_scanner_touchscreen,
  placeholder: '',
  disabled: false,
};

export { DEFAULT_INPUT_MASK };
