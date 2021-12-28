import { Component, OnInit,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm!:FormGroup;
  feedback!:Feedback;
  contactType=ContactType;
  @ViewChild('fform') formDirective!: NgForm;

  constructor(private fb:FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm():void{
    this.feedbackForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      telnum:[0,Validators.required],
      email:['',Validators.required],
      agree:false,
      contacttype:'None',
      message:''
    })
  }

  onSubmit():void{
    this.feedback=this.feedbackForm.value;
    console.log(this.feedback);
    this.formDirective.resetForm();
  }

}
