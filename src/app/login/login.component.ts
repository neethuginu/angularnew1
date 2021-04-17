import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accno = "";
  pswd = "";

  loginForm = this.fb.group({
    accno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  })


  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  getAccNo(event: any) {
    this.accno = event.target.value;
    // console.log(this.accno);
  }
  pswdChange(event: any) {
    this.pswd = event.target.value;
    // console.log(this.pswd);
  }
  login() {
    if (this.loginForm.valid) {
      var accNumber = this.loginForm.value.accno;
      var pwd = this.loginForm.value.pswd;
      this.dataService.login(accNumber, pwd)
        .subscribe((data:any)=> {
          if (data) {
            alert(data.message) ;
            localStorage.setItem("name",data.name)
            this.router.navigateByUrl("dashbord");

          }
        }, (data) => {
          alert(data.error.message);
        })


      // else{
      //   alert("invalid credentials")
      // }

    }
    else {
      alert("invalid form")
    }


  }
}
