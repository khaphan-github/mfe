import { environment } from "./environments/environment";
export function buildEndpoint(path: string): string {
  return `${environment.domain.main}/${path}`;
}
export const API_ENDPOINTS = {
  product: `${environment.domain.main}/products`,
  category: `${environment.domain.main}/category`,

  tivies: `${environment.domain.main}/api/tivies`,
  tivi: `${environment.domain.main}/api/tivies`,
  laptop: `${environment.domain.main}/api/laptops`,
  laptops: `${environment.domain.main}/api/laptops`,
  company: `${environment.domain.main}/api/company`,
  categoriesProducts: `${environment.domain.main}/api/categoriesProducts`,

  //Nhóm api module dùng trong nhiều project khác
  authenAdminManagement: buildEndpoint('authen/admin'), // <-- New auth
  profile: buildEndpoint('profile'), // User profile
  auth: `${environment.domain.main}/authen`,
  authen: buildEndpoint('authen'), // <-- New auth
  fileUpload: buildEndpoint(''),

  // Hướng dẫn
  support: `${environment.domain.main}/support`,
};
