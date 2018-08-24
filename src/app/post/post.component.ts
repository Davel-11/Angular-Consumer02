import { Component, OnInit } from '@angular/core';
//import { Http } from '@angular/http';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'post1',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit  {
  
  //variable que recibe los datos
  posts: any[];  

  ngOnInit(){    
    this.service.getPost()
    .subscribe( response => {
      this.posts = response.json();
    }, error => {
      alert('an unexpected error occurred.');
      console.log(error);
    } );
  }

  //Instacia
  constructor(private service: PostService) {     
  }   

  //----- create post -----------
  createPost(input: HTMLInputElement) {
    let post = { title: input.value }
    input.value = '';      
      this.service.createPost(post)
      .subscribe(response => {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);      
    }, (error: Response ) => {
      if( error.status == 400) 
        {}
      else {
        alert('an unexpected error occurred.');
        console.log(error);
      }      
    } ); 
  }
  //---------------------------


  updatePost(post)  {   
    this.service.updatePost(post)
    .subscribe(Response => { 
      console.log(Response.json() );
    } , error => {
      alert('an unexpected error occurred.');
      console.log(error);
    } );
  }

  // delete post
  deletePost(postdata){    
    this.service.deletePost(postdata.id)
    .subscribe( 
      response => {
        let index = this.posts.indexOf(postdata);
        this.posts.splice(index, 1);    
    }, 
        (error: AppError ) => {
        if(error instanceof NotFoundError )
          alert('This post has already been deleted.');
        else {
          alert('an unexpected error when deleting has occurred.');
          console.log(error);
        }      
      } );
  }

 

    
}
