import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelServiceService {
  constructor(
  ) { }

  getUserInfo = () => {
    // const key = this.appStore.localStorageKeys.feature.auth.userInformation;
    // const scope = { location: StorageLocation.LOCAL_STORAGE };
    // const info = this.appStore.getItem<any>(key, scope);
    // return {
    //   avatar: info?.image ?? 'assets/img/no-image-available.jpg',
    //   displayName: info?.Ho_Ten ?? info?.ho_ten, //<-- ho_ten is key when login by token
    //   email: info?.email
    // }
  }
}
