import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {



  baseUrl :String  = "https://localhost:7069/"
  constructor( private http:HttpClient) { }


  getAllEmployees():Observable<Employee []>{
   return this.http.get<Employee[]>(this.baseUrl + 'api/employee')
  }

  createEmployee(addEmpReq:Employee) :Observable<Employee> {
    addEmpReq.id ='00000000-0000-0000-0000-000000000000';
   return this.http.post<Employee>(this.baseUrl + 'api/employee',addEmpReq)

  }

  getEmpId(id:string):Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl+'api/employee/'+id  )
  }

  updateEmpId(id:String , updateEmpReq :Employee ):Observable<Employee>{
    return this.http.put<Employee>(this.baseUrl+'api/employee/'+id, updateEmpReq)
  }

  deleteEmpId(id:string ):Observable<Employee>{
    return this.http.delete<Employee>(this.baseUrl+'api/employee/'+id)
  }
}
