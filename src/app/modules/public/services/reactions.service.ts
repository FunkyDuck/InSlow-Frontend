import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserGuard } from '../user.guard';
import { IReactions } from './ireactions';

@Injectable({
  providedIn: 'root'
})
export class ReactionsService {
  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify(localStorage.getItem('token'))
      })
    }
  };

  url: string = "http://localhost:8080/reaction";

  constructor(private http: HttpClient, private userGuard: UserGuard) { }

  postReaction(reaction: IReactions) {
    return this.http.post(this.url, reaction, this.httpOptions());
  }
}
