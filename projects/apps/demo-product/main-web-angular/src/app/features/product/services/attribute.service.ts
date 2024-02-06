import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap, of, throwError } from "rxjs";
import { Attribute, AttributeItem } from "../model/attribute.model";
import { API_ENDPOINTS } from "@config/api.config";
import { ErrorBase } from "@core/models/error-base.model";
import _ from "lodash";
import { AttributesModel } from "../model/attributes.model";

@Injectable()
export class AttributeService {

  attributes: AttributesModel = new AttributesModel();

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getAttribute(id: number | string) : Observable<Attribute> {
    // Kiểm tra có tồn tại trong shared state hay không, nếu có thì lấy trong shared;
    const productInState = this.attributes.findById(id);
    if (productInState) {
      return of(productInState);
    }
    const url = `${API_ENDPOINTS.product}/${id}`;

    const response = this.httpClient.get<any>(url, {
      observe: 'response',
    });

    return response.pipe(
      map((response) => new Attribute().setDataByResponse(response.body)),
      tap((value) => {
          this.attributes.appendItemsToAttributeList(value);
      }),
      catchError((error: ErrorBase) => {
        return throwError(() => error);
      })
    );
  }

}
