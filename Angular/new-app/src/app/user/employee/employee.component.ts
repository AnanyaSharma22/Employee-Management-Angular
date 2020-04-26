import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'address',
    'city',
    'mobile_number',
    'actions'
  ];
  dataSource :any;

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    return this.employeeService.getEmployees().subscribe(
      data => {
        this.dataSource = data;
      }
    )
  }

  addEmployee(){
    this._openDialog({})
  }

  editEmployee(id){
    this.employeeService.getEmployeeDetail(id).subscribe(
      data =>{
        this._openDialog(data);
      }
    )
  }

  _openDialog(userDetails) {
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      width: '500px',
      data: { userDetails }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  signOut(){
    this.auth.logout().subscribe(
      data => {
        this.router.navigate(['/users/login']);
      }
    );
  }

}
