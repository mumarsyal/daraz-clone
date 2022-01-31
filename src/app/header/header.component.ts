import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	userIsAuthenticated: boolean = false;
	private authStatusSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		// this.userIsAuthenticated = JSON.parse(localStorage.getItem('userIsAuthenticated'));
		this.authStatusSub = this.authService
			.getAuthStatusListener()
			.subscribe((isAuthenticated) => {
				this.userIsAuthenticated = isAuthenticated;
			});
	}

	onLogout(): void {
		this.authService.logout();
	}

	ngOnDestroy(): void {
		this.authStatusSub.unsubscribe();
	}
}
