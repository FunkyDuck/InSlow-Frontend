import { AbstractControl, FormControl, Validators } from "@angular/forms";

export type FormType = { [key: string]: AbstractControl };

export const F_POST: FormType = {
    media: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required, Validators.maxLength(1024)]),
}