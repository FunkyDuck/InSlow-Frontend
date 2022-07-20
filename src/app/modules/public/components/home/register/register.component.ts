import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../../services/iuser';
import { UsersService } from '../../../services/users.service';
import { F_REGISTER } from '../../register.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  validMail: boolean = false;
  validName: boolean = false;
  validBirth: boolean = false;
  nameLength: number = 0;
  passwordLength: number = 0;
  isPasswordForbidden: boolean = false;

  forbiddenChar = /([^A-Za-z0-9-_.])/g;
  forbiddenPassword = ['password', 'azerty', 'ytreza', 'qwerty', 'ytrewq', 'azertyuiop', 'poiuytreza', '123456', '012345', '123456789', '0123456789', '1234567890', '654321', '543210', '9876543210', '0987654321', 'qwerty123', 'azerty123', 'azerty123456', '1q2w3e', '12345678', '111111', '11111111', 'daniel', 'liverpool', 'chelsea', 'arsenal', 'angels', 'london', 'austin', 'antonio', 'newyork', 'new-york', 'summer', 'winter', 'sping', 'autumn', 'monday', 'thursday', 'wednesday', 'tuesday', 'friday', 'saturday', 'sunday', 'january', 'february', 'august', 'september', 'october', 'november', 'december', 'butter', 'cookie', 'cookies', 'burger', 'hamburger'];

  constructor(private usersService: UsersService, private _fb: FormBuilder, private router: Router) {
    this.formRegister = this._fb.group(F_REGISTER);
  }

  ngOnInit(): void {
  }

  checkMail() {
    console.log(this.formRegister.controls['mail'].status)
    const data: string = this.formRegister.value.mail;
    let r: any;
    this.usersService.checkUserNameOrMail(data, 'mail').subscribe(res => {
      r = res.body;
      setTimeout(() => { this.validMail = r.exist }, 25);
    });
  }

  checkName() {
    // console.log(this.formRegister)
    this.formRegister.value.name = this.formRegister.value.name.replace(this.forbiddenChar, '');
    const data: string = this.formRegister.value.name;
    let r: any;
    this.usersService.checkUserNameOrMail(data, 'name').subscribe(res => {
      r = res.body;
      setTimeout(() => {
        this.validName = r.exist;
        this.nameLength = this.formRegister.value.name.length;
      }, 25);
    });
  }

  checkPassword() {
    setTimeout(() => {
      const password: string = this.formRegister.value.password;
      this.isPasswordForbidden = false;
      if (password === this.formRegister.value.mail || password === this.formRegister.value.name || this.forbiddenPassword.includes(password.toLowerCase())) {
        this.isPasswordForbidden = true;
      }
      this.passwordLength = password.length;
    }, 25);
  }

  checkYear() {
    const today = new Date();
    const birth = new Date(this.formRegister.value.birthDate);

    this.validBirth = false;

    if ((today.getFullYear() - birth.getFullYear() > 16) || (today.getFullYear() - birth.getFullYear() === 16 && (today.getMonth() > birth.getMonth() || (today.getMonth() == birth.getMonth() && today.getDate() >= birth.getDate())))) {
      this.validBirth = true;
    }
  }

  register() {
    if (this.formRegister.valid && this.validBirth === true) {
      const reg = this.formRegister.value;
      const user: IUser = { name: reg.name, mail: reg.mail, password: reg.password, birthDate: reg.birthDate, country: reg.country, city: reg.city };
      this.usersService.postUser(user).subscribe(res => {
        let d: any = res;
        localStorage.setItem('token', d['JWT']);
        this.router.navigateByUrl("/user/wall");
      });
    }
  }
}
