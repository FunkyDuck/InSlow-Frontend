import { AbstractControl, FormControl, Validators } from "@angular/forms";

export type FormType = { [key: string]: AbstractControl };

export const F_LOGIN: FormType = {
    mail: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
}