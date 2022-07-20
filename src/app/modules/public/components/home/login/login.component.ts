import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../../services/iuser';
import { UsersService } from '../../../services/users.service';
import { UserGuard } from '../../../user.guard';
import { F_LOGIN } from '../../login.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup

  constructor(private userService: UsersService, private userGuard: UserGuard, private _fb: FormBuilder, private router: Router) {
    this.formLogin = this._fb.group(F_LOGIN);
  }

  ngOnInit(): void {
  }

  login() {
    if (this.formLogin.valid) {
      const user: IUser = { mail: this.formLogin.value.mail, password: this.formLogin.value.password, name: '', birthDate: new Date() };
      this.userService.login(user).subscribe(res => {
        let d: any = res;
        localStorage.setItem('token', d['JWT']);
        this.router.navigateByUrl("/user/wall");
      });

    } else {
      console.log("login error")
      console.warn(this.formLogin)
    }
  }

}
