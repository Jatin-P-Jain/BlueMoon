import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild('toTime') toTimeInput!: ElementRef;
  @ViewChild('fromTime') fromTimeInput!: ElementRef;
  showCal!: any;
  timeForm!:FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.timeForm = this.fb.group({
      fromTime: [, Validators.required],
      toTime: [, Validators.required]
    })
  }
  test() {
    console.log('Clicked')
    const inputElement: HTMLElement = this.fromTimeInput.nativeElement as HTMLElement;
    console.log(inputElement);

    console.log(this.timeForm.value['fromTime'])
    const dateElement: HTMLElement = this.toTimeInput.nativeElement as HTMLElement;
    dateElement.click();
    // inputElement.click();
    // if(inputElement.nodeValue!=''){
    // 
  }


}
