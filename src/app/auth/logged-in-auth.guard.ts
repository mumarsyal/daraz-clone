import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class LoggedInAuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const authenticated = this.authService.getAuthStatus();

		if (!authenticated) {
			return true;
		}
		return this.router.navigate(['/']);
	}
}
