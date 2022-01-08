import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Comment } from '../shared/Comment';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {
  dish!:Dish;
  dishIds!:string[]
  prev!:string;
  next!:string;
  commentForm!:FormGroup;
  comment:Comment|any;
  @ViewChild('fform') formDirective!: NgForm;

  formErrors:any = {
    'author': '',
    'comment': ''
  };

  validationMessages:any = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
     }
  };

  constructor(private dishService:DishService,
    private location:Location,
    private route:ActivatedRoute,private fb:FormBuilder,
    @Inject("BaseURL") public BaseURL:string) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(ids=>this.dishIds=ids);
    this.route.params.pipe(switchMap((params:Params)=>this.dishService.getDish(params['id']))).subscribe((dish)=>{this.dish=dish; this.setPrevNext(dish.id)} );
  }

  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', [Validators.required]],
      rating: 5,
      date: ''
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset form validation messages
    // this.newComment.author = 'DHRUV';
    // this.newComment.comment = 'comment';
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
    this.comment = form.value;
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.comment = null;
    this.formDirective.resetForm();
    this.commentForm.reset({
      rating:5
    });
  }
}
