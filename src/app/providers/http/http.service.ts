import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponseInterface } from '../../interfaces/api-response.interface';

@Injectable()
/**
 * Class used to manage http requests.
 * @class HttpProvider
 */
export class HttpProvider {
  private showResponses: boolean = environment.showLogs;
  private apiUrl: string = environment.apiPath;
  private credentials: boolean = true;

  /**
   * @constructor
   * @param http Angular http service
   * @param alertsProvider alerts service
   * @param userSessionProvider alerts service
   * @param router alerts service
   */
  constructor(
    private http: Http,
    private router: Router
  ) {}

  public httpRequest(
    method: string,
    requestType: 'get'|'post'|'badPost'|'put'|'delete',
    requestOptions: {
      queryObj?: Object,
      mapFunctions?: {success: (e) => {}, fail: (e) => {}}
    } = {}
  ): Observable<any> {
    let request;
    if (requestType === 'get') {
      request = this.http.get(`${this.apiUrl}${method}`, {
        search: this.objToQueryStr(requestOptions.queryObj),
        withCredentials: this.credentials
      });
    } else if (requestType === 'delete') {
      request = this.http[requestType](`${this.apiUrl}${method}`, {
        withCredentials: this.credentials
      });
    } else {
      request = this.http[requestType](`${this.apiUrl}${method}`, requestOptions.queryObj, {
        withCredentials: this.credentials
      });
    }

    return request
      .map((requestOptions.mapFunctions) ? requestOptions.mapFunctions.success : (data) => this.extractData(data))
      .catch((requestOptions.mapFunctions) ? requestOptions.mapFunctions.fail : (data) => this.handleError(data));
  }

  /**
   * Http response parser (JSON -> Object)
   * @param response Response JSON string
   * @returns Object
   */
  private extractData(response): ApiResponseInterface {
    if (this.showResponses) {
      console.log('ok', response);
    }
    return {
      response: this.isJson(response) ? response.json() : '',
      status: response.status,
      type: response.type,
      myStatus: true,
      headers: response.headers
    };
  }
  /**
   * Http response error msg handler
   * @param response Response error object
   * @returns Observable
   */
  private handleError(response): Observable<ApiResponseInterface> {
    if (this.showResponses) {
      console.log('fail', response);
    }

    let res = {
      response: this.isJson(response) ? response.json() : {},
      status: response.status,
      type: response.type,
      myStatus: false,
      headers: response.headers
    };

    // this.alertsProvider.alertErrors(res.response);

    if (response.status === 401) {
      // this.userSessionProvider.setUserSubject(undefined);
      this.router.navigate(['/login']);
    }

    return Observable.of(res);
  }

  /*
   *
   *    queryObj convert examples:
   *      - queryObj.page=0 converts to page=0
   *      - queryObj.layers=['first','second'] converts to layers[]=first&layers[]=second
   *      - queryObj.conditions=[
   *        'condition1' = [
   *          'condition1Value'
   *        ],
   *        'condition2' = [
   *          'condition2Value'
   *        ]
   *      ]   converts to conditions['condition1']=condition1Value&conditions['condition2']=condition2Value
   */
  private objToQueryStr(queryObj): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();

    if (queryObj) {
      let keys: Array<string> = Object.keys(queryObj);
      keys.forEach(key => {
        if (Object.prototype.toString.call( queryObj[key] ) === '[object Array]') {
          for (let arrParamKey in queryObj[key]) {
            let arrParam = queryObj[key][arrParamKey];

            if (Object.prototype.toString.call( arrParam ) === '[object Array]') {
              arrParam.forEach(nestedArrParam => {
                params.append(`${key}[${arrParamKey}]`, nestedArrParam);
              });
            } else {
              params.append(`${key}[]`, arrParam);
            }
          }
        } else {
          params.set(key, queryObj[key]);
        }
      });
    }
    return params;
  }

  private isJson(response): boolean {
    try {
      response.json();
    } catch (e) {
      return false;
    }
    return true;
  }
}
