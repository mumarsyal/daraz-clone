import { FormControl } from '@angular/forms';
import * as EmailValidator from 'email-validator';

export const validateEmail = (emailField: FormControl) => {
	return EmailValidator.validate(emailField.value)
		? null
		: { validateEmail: { valid: false } };
};
