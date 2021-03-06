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

  // url: string = "https://localhost:51564/reaction"; // DEV
  url: string = "https://inslow.tk:51564/reaction"; // PROD

  constructor(private http: HttpClient) { }

  postReaction(reaction: IReactions) {
    return this.http.post(this.url, reaction, this.httpOptions());
  }
}
