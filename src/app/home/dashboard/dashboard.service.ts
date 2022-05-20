import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  createTask(taskData: any) :Observable<any>{
    return this.http.post<any>("http://localhost:3000/tasks/",taskData);
  }
  getTasksByUser(userName: any):Observable<any>{
    return this.http.get<any>("http://localhost:3000/tasks/"+userName);
  }
  completeTask(taskId: any,taskCompleteData:any):Observable<any>{
    return this.http.patch<any>("http://localhost:3000/tasks/"+taskId,taskCompleteData);
  }
}
