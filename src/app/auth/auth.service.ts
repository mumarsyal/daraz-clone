import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private usersApiUrlPrefix = environment.apiUrlPrefix + 'users/';
	private errorListener: Subject<{
		message: string;
		errorField: string;
	} | null> = new Subject();
	private authStatusListener: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);
	private authStatus: boolean = false;
	private authToken: string;
	private authUserId: string;
	private authTimeout: any;

	constructor(private http: HttpClient, private router: Router) {}

	signup(email: string, password: string) {
		return this.http.post(`${this.usersApiUrlPrefix}signup`, {
			email: email,
			password: password,
		});
	}

	login(email: string, password: string) {
		this.http
			.post<{
				message: string;
				token?: string;
				expiresIn?: number;
				userId?: string;
				errorField?: any;
			}>(`${this.usersApiUrlPrefix}login`, {
				email: email,
				password: password,
			})
			.subscribe(
				(success) => {
					this.errorListener.next(null);
					if (success.token) {
						this.updateAuthData(
							success.token,
							true,
							success.expiresIn,
							success.userId
						);
						const now = new Date();
						const expiration = new Date(now.getTime() + success.expiresIn);
						this.saveAuthData(success.token, expiration, success.userId, true);
						this.router.navigate(['/']);
					}
				},
				(error) => {
					console.log('error');
					console.log(error);
					this.updateAuthData(null, false, 0, null);
					this.errorListener.next(error.error);
				}
			);
	}

	logout() {
		this.updateAuthData(null, false, 0, null);
		this.clearAuthData();
		this.router.navigate(['/']);
	}

	getErrorListener(): Observable<{
		message: string;
		errorField: string;
	} | null> {
		return this.errorListener.asObservable();
	}

	getAuthStatusListener(): Observable<boolean> {
		return this.authStatusListener.asObservable();
	}

	getAuthStatus(): boolean {
		return this.authStatus;
	}

	getAuthToken(): string {
		return this.authToken;
	}

	getAuthUserId(): string {
		return this.authUserId;
	}

	autoAuthUser() {
		const authData = this.getAuthData();
		if (!authData) {
			return;
		}
		const now = new Date();
		const expiresIn = authData.expiration.getTime() - now.getTime();
		if (expiresIn > 0) {
			this.updateAuthData(authData.token, true, expiresIn, authData.userId);
		} else {
			this.logout();
		}
	}

	updateAuthData(
		token: string,
		authStatus: boolean,
		expiresIn: number,
		userId: string
	) {
		this.authToken = token;
		this.authStatus = authStatus;
		this.authUserId = userId;
		this.authStatusListener.next(authStatus);
		if (expiresIn > 0) {
			this.authTimeout = setTimeout(() => {
				this.logout();
			}, expiresIn);
		} else {
			clearTimeout(this.authTimeout);
		}
	}

	saveAuthData(
		token: string,
		expiration: Date,
		userId: string,
		userIsAuthenticated: boolean
	): void {
		localStorage.setItem('authToken', token);
		localStorage.setItem('authTokenExpiration', expiration.toISOString());
		localStorage.setItem('userId', userId);
		localStorage.setItem(
			'userIsAuthenticated',
			JSON.stringify(userIsAuthenticated)
		);
	}

	getAuthData(): {
		token: string;
		expiration: Date;
		userId: string;
		userIsAuthenticated: boolean;
	} {
		const token = localStorage.getItem('authToken');
		const expiration = localStorage.getItem('authTokenExpiration');
		const userId = localStorage.getItem('userId');
		const userIsAuthenticated = JSON.parse(
			localStorage.getItem('userIsAuthenticated')
		);

		if (
			!token ||
			!expiration ||
			!userId ||
			userIsAuthenticated === null ||
			userIsAuthenticated === undefined
		) {
			return;
		}
		return {
			token: token,
			expiration: new Date(expiration),
			userId: userId,
			userIsAuthenticated: userIsAuthenticated,
		};
	}

	clearAuthData(): void {
		localStorage.removeItem('authToken');
		localStorage.removeItem('authTokenExpiration');
		localStorage.removeItem('userId');
		localStorage.removeItem('userIsAuthenticated');
	}
}
