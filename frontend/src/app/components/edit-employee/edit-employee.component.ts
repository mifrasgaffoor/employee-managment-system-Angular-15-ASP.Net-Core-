import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent  implements OnInit{



  empDetails :Employee ={
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''
  }
  constructor( private route :ActivatedRoute , private employeeService :EmployeesService ,private router :Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id = params.get('id');

        if(id){
          //call api
          this.employeeService.getEmpId(id).subscribe({
            next:(res)=>{
                 this.empDetails = res;
            }
          })

        }
      }
    })
  }

  updateEmp(){
    this.employeeService.updateEmpId(this.empDetails.id , this.empDetails)
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['employee'])

      }
    })
  }

  deleteEmp(id:string){

    this.employeeService.deleteEmpId(id)
    .subscribe({
      next:(res)=>{
        this.router.navigate(['employee'])
      }
    })
  }
}
