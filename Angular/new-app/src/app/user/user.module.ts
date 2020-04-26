import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core/core.module';
import { SignupComponent } from './signup/signup.component';
import { UsersRouestModule } from './user.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent, EmployeeComponent, AddEditModalComponent],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    UsersRouestModule,
    CoreModule
  ],
  entryComponents: [
    AddEditModalComponent
  ]
})
export class UserModule { }
