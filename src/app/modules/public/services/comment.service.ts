import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment } from './icomment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify(localStorage.getItem('token'))
      })
    }
  };

  // url: string = "https://localhost:51564/comments"; // DEV
  url: string = "https://inslow.tk:51564/comments"; // PROD

  constructor(private http: HttpClient) { }

  postComment(comment: IComment) {
    console.info(comment)
    return this.http.post(this.url, comment, this.httpOptions());
  }
}
