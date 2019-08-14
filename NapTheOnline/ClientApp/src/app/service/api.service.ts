import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseURL = environment.baseUrl;

  public gameUrl = 'api/game';
  public newUrl = 'api/new';
  private routersNames: string[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {
    this.routersNames = this.getRouteNames();
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9',
      APIKey: '~123456789~',
    });
    // 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_STORE_NAME),
    //   'SignalId': this.signalId || ''
  }

  get options() {
    return {headers: this.headers};
  }

  get fileHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
    // Authorization: 'Bearer ' + localStorage.getItem(TOKEN_STORE_NAME)
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseURL}/${url}`, this.options)
      .pipe(catchError((error) => this.handleError(error)));
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.httpClient
      .post<T>(`${this.baseURL}/${url}`, data, this.options)
      .pipe(catchError(this.handleError));
  }

  postFile<T>(url: string, files: File[]): Observable<HttpEvent<T>> {
    const formData: FormData = new FormData();
    for (const file of files) {
      formData.append(file.name, file, file.name);
    }
    const headers = this.fileHeaders;
    const uploadReq = new HttpRequest('POST', `${this.baseURL}/${url}`, formData, {
      reportProgress: true,
      headers,
    });

    return this.httpClient.request(uploadReq);
  }

  update<T>(url: string, data: any): Observable<T> {
    return this.httpClient
      .put<T>(`${this.baseURL}/${url}`, data, this.options)
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    const params: URLSearchParams = new URLSearchParams();
    const options = {headers: this.headers};

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const val = params[key];
          params.set(key, val);
        }
      }

      (options as any).search = params;
    }

    return this.httpClient
      .delete<T>(`${this.baseURL}/${url}`, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(response: HttpErrorResponse) {
    if (response.status === 500) {
      const error = response.error ? response.error.message : response.statusText;
      alert(error || 'Internal server error!');
      return throwError(response);
    }

    if (response.status === 401) {
      alert('Your session is expired. Please login again.');
      //
      // Remove user
      // this.user = null;
      //
      // Remove access token
      // this.removeUserInLocalStore();
      //
      // Navigate to login
      // this.navigateToLogin();

      return throwError(response);
    }

    if (response.status === 403) {
      alert('You don\'t have permission to perform this action');
      return throwError(response);
    }

    let messageError = '';
    if (response.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
        `body was: ${response.error}`);
    }


    if (!!response.error && !!response.error.message) {
      messageError = response.error.message;
    } else {
      messageError = 'Something bad happened. Please try again later.';
    }

    alert(messageError);

    // return an observable with a user-facing error message
    return throwError(messageError);
  }

  private getRouteNames() {
    const names = [];

    this.router.config.forEach((r) => {
      if (r.path) {
        names.push(r.path.split('/')[0]);
      }
      if (!r.children || !r.children.length) {
        return;
      }
      r.children.forEach((c) => {
        if (c.path) {
          names.push(c.path.split('/')[0]);
        }
      });
    });

    return names;
  }
}
