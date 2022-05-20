import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPasswordFlag: boolean = false;
  loginForm!: FormGroup;
  status!:any
  errorMessage!:any
  cookie!:any
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private cookieService: CookieService) { }

  showPassword() {
    this.showPasswordFlag = !this.showPasswordFlag
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required]
    })
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      this.status="Error";
      this.errorMessage= "Please provide E-mail and Password.";
    }
    else {
      this.loginService.loginUser(this.loginForm.value['email']).subscribe({
        next: (response) => {
          if (response.length==0){
            this.status="Error";
            this.errorMessage= "No User found with provided E-mail/Password.";
          }
          else{
            if(response[0].password == this.loginForm.value['password']){
              // this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
              this.cookie= {
                'username' : response[0].userName,
                'password' : CryptoJS.AES.encrypt(response[0].password, 'simplileap').toString()
              }
              this.cookieService.set('authCookie', JSON.stringify(this.cookie));
              var get_cookie = this.cookieService.get('authCookie');
              console.log(JSON.parse(get_cookie));
              console.log("Login Success");
              this.router.navigate(['/home/dashboard']);
            }
            else{
            this.status="Error";
            this.errorMessage= "Invalid Email/Password.";
            }
        }},
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
