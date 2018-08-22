import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';


@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getPost(){
    return this.http.get(this.url);
  }

  createPost(post){
    
    return this.http.post(this.url, JSON.stringify(post) );
  }

  updatePost(post){
            //this.http.put(this.url, JSON.stringify(post) )
    return this.http.patch(this.url+ '/'+post.id, JSON.stringify({ isRead: true }) );
  }

  deletePost(post){
    return this.http.delete(this.url + '/'+ post.id  )
    .catch((error: Response ) => { 
        if ( error.status === 404 )
          return Observable.throw(new NotFoundError());
        else   
        return Observable.throw(new AppError(error) );
    });


  }

}
