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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = false;
  returnUrl: string;
  signupForm: FormGroup;
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
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      company: ['', Validators.required],

  });
  this.publicToken = this.authenticationService.publicToken ? this.authenticationService.publicToken : this.loadPublicToken();
  this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/all-users';
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

  signUp() {
    const value = this.signupForm.value;
    this.authenticationService.signUp(value)
        .subscribe(
            data => {
                  this.router.navigate(['/users/employees']);
                } 
                // else {
                //     // this.router.navigate([this.returnUrl]);
                // }
            );
        }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
        return;
    }
    this.signUp();
}

}
