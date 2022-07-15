import { AbstractControl, FormControl, Validators } from "@angular/forms";

export type FormType = { [key: string]: AbstractControl };

export const F_REGISTER: FormType = {
    mail: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    passwordVerify: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    birthDate: new FormControl(new Date(), [Validators.required]),
    country: new FormControl(null, [Validators.maxLength(64)]),
    city: new FormControl(null, [Validators.maxLength(64)])
}