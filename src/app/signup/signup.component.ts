import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showPasswordFlag: boolean = false
  signupForm!: FormGroup;
  successMessage!: any;
  errorMessage!: any;
  status!:String;
  errors!:any
  list_errors!:any
  data_from_login!:any

  constructor(private signupService: SignupService, private fb: FormBuilder) { }
  ngOnInit(): void {
    
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  showPassword() {
    this.showPasswordFlag = !this.showPasswordFlag
  }
 submitSignup() {
    this.signupService.registerUser(this.signupForm.value).subscribe({
      next: (response) => {
        // console.log(typeof(response))
        if (typeof(response)==='object'){
          this.status= "Error";
          this.errorMessage= "One or more fields in the form is/are empty."
          // this.errors=Object.values(Object.values(response))[3];
          // this.list_errors = this.errors.split(',');
          // console.log(this.errors);
          // console.log(this.list_errors);
          // this.errorMessage=this.list_errors.join('/n');
          // console.log(this.errorMessage);
        }
        else{
          this.status = "Success";
          this.successMessage = response;
          console.log("success"+this.successMessage);
        }
      },
      error: (e) => {
        this.status = "Error";
        console.log("error"+e);
        this.errorMessage = e.name+ " : " +e.statusText;
      }
    });
  }

  
}
