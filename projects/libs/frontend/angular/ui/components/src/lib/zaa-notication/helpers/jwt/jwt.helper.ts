import { isDevMode } from "@angular/core";
import _ from "lodash";

export class JWTHelpler {
  public getPayloadFromToken = (token: string): any => {
    if (!token || _.isEmpty(token)) { return null; }

    const [, payloadBase64] = token.split('.');
    if (payloadBase64) {
      const payload = JSON.parse(atob(payloadBase64));
      return payload;
    }
    return null;
  }

  public idValid = (token: any): boolean => {
    if (!token) {
      return false;
    }
    try {
      const payload = this.getPayloadFromToken(token);
      if (!payload || !payload.exp) {
        return false;
      }
      const expirationTime = payload.exp * 1000;
      const currentTime = new Date().getTime();
      return expirationTime >= currentTime;
    } catch (error) {
      isDevMode() && console.error(error);
      return false;
    }
  }
}
