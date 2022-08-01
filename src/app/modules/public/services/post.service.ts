import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPosts } from './iposts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify(localStorage.getItem('token'))
      })
    }
  };

  // url: string = "https://localhost:51564/posts"; // DEV
  url: string = "https://inslow.tk:51564/posts"; // PROD

  constructor(private http: HttpClient) { }

  getPost(page: number) {
    return this.http.get<IPosts[]>(this.url + "/" + page, this.httpOptions());
  }

  postPost(post: IPosts) {
    return this.http.post<IPosts>(this.url, post, this.httpOptions());
  }
}
