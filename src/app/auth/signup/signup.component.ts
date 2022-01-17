import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { validateEmail } from '../email.validator';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup;
	signupSuccessful: string = null;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.signupForm = new FormGroup({
			email: new FormControl(null, {
				validators: [Validators.required, validateEmail],
			}),
			password: new FormControl(null, {
				validators: [Validators.required],
			}),
		});
	}

	onSignup() {
		if (this.signupForm.invalid) {
			return;
		}

		this.authService
			.signup(this.signupForm.value.email, this.signupForm.value.password)
			.subscribe(
				(success) => {
					console.log(success);
					this.signupForm.reset();
					this.signupSuccessful = success['message'];
				},
				(error) => {
					if (error.error.errorField === 'Email') {
						this.signupForm.controls['email'].setErrors({
							'server-error': error.error.message,
						});
					} else if (error.error.errorField === 'Form') {
						this.signupForm.setErrors({
							'server-error': error.error.message,
						});
					}
				}
			);
	}
}
