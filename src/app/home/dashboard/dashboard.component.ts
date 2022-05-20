import { DatePipe, Time } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DashboardService } from './dashboard.service';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName!: any
  authErrorMessage!: any
  authError: any = false
  fromTime!: Time
  taskForm!: FormGroup
  defaultDate!: any
  defaultFromTime!: any
  defaultToTime!: any
  intervalID!: any
  taskData!: any
  tasks!: any
  filteredTasks!:any
  filterText!:any
  @ViewChild('toTime') toTimeInput!: ElementRef;
  @ViewChild('fromTime') fromTimeInput!: ElementRef;
  @ViewChild('toTimeText') toTimeText!: ElementRef;
  @ViewChild('fromTimeText') fromTimeText!: ElementRef;
  status!: string;
  errorMessage!: string;
  loginService!: any;
  loginForm!: any;
  cookie!: { username: any; password: string; };
  router: any;
  successMessage: any;
  completeTaskData: any;

  
  constructor(private cookieService: CookieService, private fb: FormBuilder, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    if (this.cookieService.get('authCookie')) {
      const cookie = JSON.parse(this.cookieService.get('authCookie'));
      console.log(cookie)
      this.userName = cookie['username'];
      console.log(cookie['username']);
      this.intervalID = setInterval(() => {
        console.log("Timer" + this.intervalID);
        const pipe = new DatePipe('en-US');
        this.defaultFromTime = pipe.transform(Date.now(), 'HH:mm');
        this.defaultToTime = pipe.transform(Date.now() + 5 * 60000, 'HH:mm');
        this.taskForm.controls['fromTime'].setValue(this.defaultFromTime);
        this.taskForm.controls['toTime'].setValue(this.defaultToTime);
      }, 1000);
      const pipe = new DatePipe('en-US');
      this.taskForm = this.fb.group({
        taskName: [, Validators.required],
        taskDate: [new Date(), Validators.required],
        fromTime: [this.defaultFromTime, Validators.required],
        toTime: [this.defaultToTime, Validators.required],
        remind: [false, Validators.required],
      });
      this.getTasksByUser();
      
      
    }
    else {
      this.authError = true;
      this.authErrorMessage = "User not Authenticated!!";
    }
  }
  
  totime() {
    const pipe = new DatePipe('en-US');
    this.defaultFromTime = pipe.transform(Date.now(), 'HH:mm');
    this.defaultToTime = pipe.transform(Date.now() + 5 * 60000, 'HH:mm');
  }
  clearTimer() {
    console.log('Timer Clear')
    console.log(this.intervalID);
    clearInterval(this.intervalID);
  }
  toTimePicker() {
    const dateElement: HTMLElement = this.toTimeInput.nativeElement as HTMLElement;
    dateElement.click();
  }
  createTask() {
    this.taskForm.value['taskStatus'] = 'Mark As Complete';
    this.taskForm.value['createdBy'] = this.userName;
    console.log(this.taskForm.value);
    if (this.taskForm.invalid) {
      this.status = "Error";
      this.errorMessage = 'Please provide the Task name.'
    }
    else {
      this.dashboardService.createTask(this.taskForm.value).subscribe({
        next: (response) => {
          console.log(response)
          this.status = "Success";
          this.successMessage = response;
          this.getTasksByUser();
          
        },
        error: (e) => {
          this.status = "Error";
          console.log("error" + e);
          this.errorMessage = e.name + " : " + e.statusText;
        }
      })
    }
    this.taskForm.controls['taskName'].reset();
  }
  getTasksByUser() {
    this.dashboardService.getTasksByUser(this.userName).subscribe({
      next: (response) => {
        this.tasks = response;
        console.log(this.tasks);
        this.filteredTasks=this.tasks;
        this.filterText='All Tasks'
      },
      error: (e) => {
        this.status = "Error";
        console.log("error" + e);
        this.errorMessage = e.name + " : " + e.statusText;
      }
    })
  }
  completeTask(task:any) {
    var completeTaskData = 
                     {
                         "taskStatus":"Marked Completed",
                     };
    // this.completeTaskData['taskStatus'] = "Marked Completed"
    this.dashboardService.completeTask(task['_id'],completeTaskData).subscribe({
      next: (response) => {
        this.status='Success';
        this.successMessage = response;
        this.getTasksByUser();
      },
      error: (e) => {
        this.status = "Error";
        console.log("error" + e);
        this.errorMessage = e.name + " : " + e.statusText;
      }
    })
  }
  filterTasks(critirea:any){
    if (critirea){
      this.filterText= critirea=='Marked Completed'?'Completed Tasks':'Pending Tasks'
   this.filteredTasks=this.tasks.filter((t: any)=> t['taskStatus']==critirea)
    }
    else{
      this.filterText='All Tasks'
      this.filteredTasks=this.tasks
    }
  }
}
