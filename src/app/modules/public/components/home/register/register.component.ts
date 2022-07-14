import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  // user?: IUser;

  constructor(private usersService: UsersService, private _fb: FormBuilder) {
    this.formRegister = this._fb.group(F_REGISTER);
  }

  ngOnInit(): void {
  }

  checkNameOrMail(dataType: string) {
    const data: string = (dataType == "mail") ? this.formRegister.value.mail : this.formRegister.value.name;
    this.usersService.checkUserNameOrMail(data, dataType).subscribe(res => console.log(res.body));
  }

  register() {
    if (this.formRegister.valid) {
      const reg = this.formRegister.value;
      const user: IUser = { name: reg.name, mail: reg.mail, password: reg.password, birthDate: reg.birthDate, country: reg.country, city: reg.city };
      this.usersService.postUser(user).subscribe(res => console.log(res));
    }
  }

}
