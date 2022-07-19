import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { UserGuard } from '../user.guard';
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

  constructor(private http: HttpClient, private userGuard: UserGuard) { }

  getUser(name: string) {
    return this.http.get(this.url + '/' + name, { observe: 'response' });
  }

  checkUserNameOrMail(data: string, path: string) {
    const uri = this.url + "/check/" + path + "/" + data;
    return this.http.get<boolean>(uri, { observe: 'response' });
  }

  postUser(user: IUser) {
    return this.http.post<IUser>(this.url, JSON.stringify(user), this.httpOptions);
  }

  login(user: IUser) {
    return this.http.post(this.url + '/connect/', JSON.stringify(user), this.httpOptions);
  }

  isConnected() {
    const JWT = localStorage.getItem('token');
    const HELPER = new JwtHelperService();
    if (HELPER.isTokenExpired(JWT as any) == false)
      return true;
    return false;
  }
}
