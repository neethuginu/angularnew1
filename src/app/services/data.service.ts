import { HttpClient, HttpClientModule } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';
const options={
  withCredentials:true
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;

  accountDetails: any = {
    1000: { acno: 1000, balance: 10000, username: "userone", password: "testuser1" },
    1001: { acno: 1001, balance: 20000, username: "usertwo", password: "testuser2" },
    1002: { acno: 1002, balance: 30000, username: "userthree", password: "testuser3" }
  }
  currentUser: any;
 

  constructor(private http:HttpClient) {
    this.getDetails();
   }
saveDetails(){
  localStorage.setItem("accountDetails",JSON.stringify(this.accountDetails))
  if(this.currentUser){
    localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
  }
}

  getDetails() {
    if (localStorage.getItem("accountDetails")) {
      // this.accountDetails=localStorage.getItem("accountDetails")
      this.accountDetails = JSON.parse(localStorage.getItem("accountDetails") || '')
    }
    if (localStorage.getItem("currentUser")) {
      this.currentUser = localStorage.getItem("currentUser")
    }
  }

register(acno: any, username: any, password: any) {
  const data:any = {
    acno,
    balance: 0,
    username,
    password
  }
   return this.http.post("http://localhost:3000/register",data)
   }


login(acno: any, password: any) {
  const data:any = {
    acno,          
    password
  }
   return this.http.post("http://localhost:3000/login",data,options)
   

}
deposit(acno: any, password: any, amnt: any) {
  const data:any = {
    acno,          
    password,
    amnt
  }
   return this.http.post("http://localhost:3000/deposit",data,options)
    
}
withdrwal(acno: any, password: any, amnt: any) {
  const data:any = {
    acno,          
    password,
    amnt
  }
   return this.http.post("http://localhost:3000/withdraw",data,options)
 
}


}
