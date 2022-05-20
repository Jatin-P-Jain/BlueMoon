import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  registerUser(userData: any){
    return this.http.post<any>("http://localhost:3000/users/",userData);
  }
}
