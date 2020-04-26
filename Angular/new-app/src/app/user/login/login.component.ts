import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = false;
  returnUrl: string;
  loginForm: FormGroup;
  submitted = false;
  publicToken = null;
  errorMessage = null;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.publicToken = this.authenticationService.publicToken ? this.authenticationService.publicToken : this.loadPublicToken();
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/all-users';
  }

  loadPublicToken(){
    this.authenticationService.getPublicToken()
    .pipe(first())
    .subscribe(
        data => {
        },
        error => {

        });
  }

  
  login() {
    const value = this.loginForm.value;
    this.authenticationService.login(value)
        .subscribe(data =>
                {
                  this.router.navigate(['/users/employees']);
                } 
            );
        }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.login();
}


}
