import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-writers',
  templateUrl: './writers.component.html',
  styleUrls: ['./writers.component.css']
})
export class WritersComponent implements OnInit {

  blogForm: FormGroup;
  title: FormControl;

  constructor() {
    this.title = new FormControl('',[Validators.required])
    this.blogForm = new FormGroup({
      title: this.title,
      content: new FormControl('',[Validators.required])
    })

  }

  ngOnInit() {
    this.blogForm.controls['title'].valueChanges.subscribe(res => {
      console.log(res)
    })
  }

  name = 'John Doe';
  // inputValue: string = 'Title...';
  
  // updateInputValue(event: Event): void {
  //   this.inputValue = (event.target as HTMLInputElement).value;
  // }

  savingStatus: string = "Saving..."; // Add the saving status variable
  saveTimer: any;

  onTyping(): void {
    if (this.blogForm.valid) {
      this.savingStatus = "Saving...";
      clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => {
        this.savingStatus = "Saved";
        

        // Call your save function or API request here
        
      }, 1000);
    }
  }
}
