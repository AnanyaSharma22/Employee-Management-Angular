import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public baseUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.baseUrl = environment.apiEndpoint;
  }

  getEmployees() {
    return this.http.get(this.baseUrl + 'app/employee/', {
        params: new HttpParams()
    }).pipe(
        map(res =>  {
            return res;
        })
    );
  }

  createEmployee(data) {
    return this.http.post(this.baseUrl + 'app/employee/', {
      "firstname": data.firstname,
      "lastname": data.lastname,
      "address": data.address,
      "city": data.city,
      "mobile_number": data.mobile_number
    }).pipe(
        map(res =>  {
            return res;
        })
    );
  }

  getEmployeeDetail(id) {
    return this.http.get(this.baseUrl + 'app/employee/'+id+'/', {
        params: new HttpParams()
    }).pipe(
        map(res =>  {
            return res;
        })
    );
  }

  updateEmployee(data, id) {
    return this.http.put(this.baseUrl + 'app/employee/'+id+'/', {
      "firstname": data.firstname,
      "lastname": data.lastname,
      "address": data.address,
      "city": data.city,
      "mobile_number": data.mobile_number
    }).pipe(
        map(res =>  {
            return res;
        })
    );
  }

}
