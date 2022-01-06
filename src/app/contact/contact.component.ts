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

  formErrors:any={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  }

  validationMessages:any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb:FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm():void{
    this.feedbackForm = this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      lastname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      telnum:[0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree:false,
      contacttype:'None',
      message:''
    });

    this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));

    this.onValueChanged();  //reset form validation messages
  }

  onValueChanged(data?:any){
    if(!this.feedbackForm) {return;}

    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+' ';
            }
          }
        }
      }
    }
  }

  onSubmit():void{
    this.feedback=this.feedbackForm.value;
    console.log(this.feedback);
    this.formDirective.resetForm();
  }

}
