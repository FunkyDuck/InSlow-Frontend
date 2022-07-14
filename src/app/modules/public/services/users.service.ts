import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  url: string = "http://localhost:8080/user";

  constructor(private http: HttpClient) { }

  getUser() { }

  checkUserNameOrMail(data: string, path: string) {
    const uri = this.url + "/check/" + path + "/" + data;
    return this.http.get<boolean>(uri, { observe: 'response' });
  }

  postUser(user: IUser) {
    return this.http.post<IUser>(this.url, JSON.stringify(user), this.httpOptions);
  }

  login() { }
}
