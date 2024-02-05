export class BoLocSanPham {
  //gia ca
  giaTuKhoan: number;
  giaDenKhoan: number;

  nhaCungCap: string[];

  constructor(giaTuKhoan: number, giaDenKhoan: number, nhaCungCap: string[]) {
    this.giaTuKhoan = giaTuKhoan;
    this.giaDenKhoan = giaDenKhoan;
    this.nhaCungCap = nhaCungCap;
  }
}


//data render
//data trong store: dang chọn hiện tại.
