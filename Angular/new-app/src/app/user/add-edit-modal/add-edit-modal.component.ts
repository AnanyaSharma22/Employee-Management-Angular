import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css']
})
export class AddEditModalComponent implements OnInit {
  employeeForm:FormGroup;
  submitted = false;
  userDetailsObj: any;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<AddEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.userDetailsObj=data;
    if(data){
      this.initializeEditForm(data);
    }else{
      this.initializeForm();
    }
  }

  initializeEditForm(data){
    this.employeeForm = this.formBuilder.group({
      firstname: [data.userDetails.firstname, Validators.required],
      lastname: [data.userDetails.lastname, Validators.required],
      address: [data.userDetails.address, Validators.required],
      city: [data.userDetails.city, Validators.required],
      mobile_number: [data.userDetails.mobile_number, Validators.required],
    });
  }

  initializeForm(){
    this.employeeForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      mobile_number: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  save() {
    this.submitted = true;
    const value = this.employeeForm.value;
    if (this.employeeForm.valid) {
      if(this.userDetailsObj){
        this.employeeService.updateEmployee(value, this.userDetailsObj.userDetails.id)
          .subscribe(
            data => {
              this.dialogRef.close(this.employeeForm.value);
            }
          )
      }else{
        this.employeeService.createEmployee(value)
        .subscribe(
          data => {
            this.dialogRef.close(this.employeeForm.value);
          }
        )
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

}
