import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class LoggedOutAuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| UrlTree
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree> {
		const authenticated = this.authService.getAuthStatus();

		if (authenticated) {
			return true;
		}
		return this.router.navigate(['/login']);
	}
}
