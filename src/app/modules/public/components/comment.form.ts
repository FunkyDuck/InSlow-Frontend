import { AbstractControl, FormControl, Validators } from "@angular/forms";

export type FormType = { [key: string]: AbstractControl };

export const F_COMMENT: FormType = {
    content: new FormControl(null, [Validators.required, Validators.maxLength(512)]),
}