import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname = "";
  pswd = "";
  acno = "";
  mobile = "";
  // <------reactive form---->
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    mobile: ['', [Validators.required]]

  });

  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  register() {

    if (this.registerForm.valid) {
      this.dataService.register(this.registerForm.value.acno, this.registerForm.value.uname, this.registerForm.value.pswd)
        .subscribe(data => {
          if (data) {
            alert("register suceesful,pls login")
            this.router.navigateByUrl("");

          }
        },(data)=>{

        alert(data.error.message);
        })

    }
    else {
      alert("form invalid")
    }


  }
}


