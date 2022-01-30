import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { validateEmail } from '../email.validator';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;
	loginSuccessful: string = null;
	errorListenerSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl(null, {
				validators: [Validators.required],
			}),
			password: new FormControl(null, {
				validators: [Validators.required],
			}),
		});

		this.errorListenerSub = this.authService
			.getErrorListener()
			.subscribe((error) => {
				if (!error) {
					return;
				}
				if (error.errorField === 'Email') {
					this.loginForm.controls['email'].setErrors({
						'server-error': error.message,
					});
				} else if (error.errorField === 'Password') {
					this.loginForm.controls['password'].setErrors({
						'server-error': error.message,
					});
				} else if (error.errorField === 'Form') {
					this.loginForm.setErrors({
						'server-error': error.message,
					});
				}
			});
	}

	onLogin() {
		if (this.loginForm.invalid) {
			return;
		}

		this.authService.login(
			this.loginForm.value.email,
			this.loginForm.value.password
		);
	}

	ngOnDestroy(): void {
		this.errorListenerSub.unsubscribe();
	}
}
