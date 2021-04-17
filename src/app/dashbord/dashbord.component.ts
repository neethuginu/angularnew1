import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']

})
export class DashbordComponent implements OnInit {
  depositForm = this.fb.group({
    accno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  });
  withdrwalForm = this.fb.group({
    accno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })
  name: any;
  constructor(public dataService: DataService, private fb: FormBuilder) {
    this.name = localStorage.getItem("name")
  }

  ngOnInit(): void {

  }
  deposit() {
    if (this.depositForm.valid) {
      this.dataService.deposit(this.depositForm.value.accno, this.depositForm.value.pswd, this.depositForm.value.amount)
        .subscribe((data: any) => {
          if (data) {
            alert(data.message);
            alert(data.balance)
          }
        }, (data) => {
          alert(data.error.message)

        })
    }
    else {
      alert("invalid form")
    }
  }

  withdrwal() {
    if (this.withdrwalForm.valid) {
      this.dataService.withdrwal(this.withdrwalForm.value.accno, this.withdrwalForm.value.pswd, this.withdrwalForm.value.amount)
        .subscribe((data: any) => {
          if (data) {
            alert(data.message);
            alert(data.balance)
          }
        }, (data) => {
          alert(data.error.message)

        })
    }
    else {
      alert("invalid form")
    }
  }
}