import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public baseUrl: string;
  public static readonly PUBLIC_TOKEN = 'PT_D';
  public static readonly USER_TOKEN = 'UT_D';
  public user:any;
  public errors: any;
  public publicData: any;
  public publicApiToken: string;
  public userApiToken: string;
  public getLoggedUser = new Subject();
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.baseUrl = environment.apiEndpoint;
    this.loadData();
  }

  private loadData(){
    const publicdata = JSON.parse(localStorage.getItem(AuthenticationService.PUBLIC_TOKEN));
    const userdata = JSON.parse(localStorage.getItem(AuthenticationService.USER_TOKEN));
    if (userdata) {
      this.updateUserDetail(userdata);
    }
    if (publicdata) {
      this.updatePublicTokenDetail(publicdata);
    }
  }

  get publicToken() {
    return this.publicApiToken;
  }

  get userToken() {
    return this.userApiToken;
  }

  login(data): Observable<any> {
    this.errors = null;
    return this.http
      .post<any>(this.baseUrl + 'app/login/', {
        "email": data.email,
        "password": data.password
       })
      .pipe(
        map(response => {
          if (response) {
            this.loggedIn.next(true);
            localStorage.setItem(
              AuthenticationService.USER_TOKEN,
              JSON.stringify(response.extras)
            );
            this.updateUserDetail(response.extras);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  signUp(data): Observable<any> {
    this.errors = null;
    return this.http
      .post<any>(this.baseUrl + 'app/signup/', {
        "email": data.email,
        "password": data.password,
        "firstname": data.firstname,
        "lastname": data.lastname,
        "company": data.company
       })
      .pipe(
        map(response => {
          if (response.status === 200) {
            this.loggedIn.next(true);
            localStorage.setItem(
              AuthenticationService.USER_TOKEN,
              JSON.stringify(response.extras)
            );
            this.updateUserDetail(response.extras);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    const user_token = localStorage.getItem(AuthenticationService.USER_TOKEN);
    return this.http.put(this.baseUrl + 'app/logout/',{user_token})
      .pipe(
          map(res =>  {
            localStorage.removeItem(AuthenticationService.USER_TOKEN);
            this.userApiToken = null;
            this.user = null;
            this.getLoggedUser.next(this.user);
            this.router.navigate(['/users/login']);
            return res;
          })
      );
  }

  getPublicToken(): Observable<any> {
    const localVar = localStorage.getItem(AuthenticationService.PUBLIC_TOKEN);
    if (localVar) {
      return new Observable(observer => {
        return observer.next(JSON.parse(localVar).access_token);
      });
    }
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('username', environment.username);
    urlSearchParams.set('password', environment.password);
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('client_id', environment.client_id);
    urlSearchParams.set('client_secret', environment.client_secret);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const body = urlSearchParams.toString();
    return this.http.post<any>(this.baseUrl + 'o/token/', body, httpOptions).pipe(
      map(response => {
        if (response) {
          localStorage.setItem(AuthenticationService.PUBLIC_TOKEN, JSON.stringify(response));
          this.updatePublicTokenDetail(response);
        }
        return response.access_token;
      })
    );
  }

  
  getApiToken() {
    const publicData: any = JSON.parse(localStorage.getItem(AuthenticationService.PUBLIC_TOKEN));
    if (publicData) {
      publicData.pipe(
        map(data => {
          return console.log('public');
        })
      );
    }
  }

  getPublicApiToken<T>(): T {
    const publicData = JSON.parse(localStorage.getItem(AuthenticationService.PUBLIC_TOKEN));
    return publicData ? publicData.token : false;
  }

  updateUserDetail(userDetail) {
    this.userApiToken = userDetail.access_token;
    this.user = userDetail;
    this.getLoggedUser.next(this.user);
    return this;
  }

  updatePublicTokenDetail(publicTokenDetail: any) {
    this.publicData = publicTokenDetail;
    this.publicApiToken = publicTokenDetail.access_token;
    return this;
  }

}
