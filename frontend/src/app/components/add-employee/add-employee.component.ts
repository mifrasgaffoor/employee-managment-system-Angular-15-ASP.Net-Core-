import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {




  addEmpReq :Employee ={
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''
  }


  constructor( private employeeService :EmployeesService , private router :Router ){}

addEmp(){
  console.log(this.addEmpReq);
  this.employeeService.createEmployee(this.addEmpReq)
  .subscribe({
    next:(employee)=>{
      console.log(employee);
      this.router.navigate(['employee'])

    }
  })

}

}
