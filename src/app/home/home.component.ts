import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName!: any
  authErrorMessage!: any
  authError: any = false

  plainText!: string;
  encPassword!: string;
  conversionEncryptOutput!: string;

  encryptText!: string;
  decPassword!: string;
  conversionDecryptOutput!: string;

  isDashboard: boolean = true;
  isContentHub: boolean = false;
  isConversations: boolean =false;
  isContacts: boolean = false;
  isCompose: boolean = false;
  isLogout: boolean = false;

  constructor(private router: Router, private cookieService: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.cookieService.get('authCookie')) {
      const cookie = JSON.parse(this.cookieService.get('authCookie'));
      console.log(cookie)
      this.userName = cookie['username'];
      console.log(cookie['username']);
    }
    else {
      this.authError = true;
      this.authErrorMessage = "User not Authenticated!!";
    }

    // this.activateRouter.queryParams.subscribe({
    //   next: (params) => {this.userName=params['user_name']}
    // });
  }
  dashboard() {
    this.isDashboard = true;
    this.isContentHub = false;
    this.isConversations = false;
    this.isContacts = false;
    this.isCompose = false;
    this.isLogout = false;
    this.router.navigate(['dashboard'], { relativeTo: this.route });

  }
  content() {
    this.isDashboard = false;
    this.isContentHub = true;
    this.isConversations = false;
    this.isContacts = false;
    this.isCompose = false;
    this.isLogout = false;
  }
  conversations() {
    this.isDashboard = false;
    this.isContentHub = false;
    this.isConversations = true;
    this.isContacts = false;
    this.isCompose = false;
    this.isLogout = false;
  }
  contacts() {
    this.isDashboard = false;
    this.isContentHub = false;
    this.isConversations = false;
    this.isContacts = true;
    this.isCompose = false;
    this.isLogout = false;
  }
  compose() {
    this.isDashboard = false;
    this.isContentHub = false;
    this.isConversations = false;
    this.isContacts = false;
    this.isCompose = true;
    this.isLogout = false;
  }
  logout() {
    this.isDashboard = true;
    this.isContentHub = false;
    this.isConversations = false;
    this.isContacts = false;
    this.isCompose = false;
    this.isLogout = true;
    this.router.navigate(['/login']);
    this.cookieService.deleteAll();
  }
  //method is used to encrypt and decrypt the text  
  convertText(conversion: string) {
    if (conversion == "encrypt") {
      this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
    }
    else {
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

    }
  }
}
