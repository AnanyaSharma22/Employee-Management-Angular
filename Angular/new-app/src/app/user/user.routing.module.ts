import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../user/signup/signup.component';
import { LoginComponent } from '../user/login/login.component';
import { EmployeeComponent } from '../user/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employees',
    component: EmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRouestModule {} 
