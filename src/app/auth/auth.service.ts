import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private usersApiUrlPrefix = environment.apiUrlPrefix + 'users/';

	constructor(private http: HttpClient) {}

	signup(email: string, password: string) {
		return this.http.post(`${this.usersApiUrlPrefix}signup`, {
			email: email,
			password: password,
		});
	}
}
