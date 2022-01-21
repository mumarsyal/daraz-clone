import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
	userIsAuthenticated: boolean = false;
	activeRoute: string = null;
	private authStatusSub: Subscription;
	categories: Category[] = [];

	constructor(
		private categoryService: CategoryService,
		private authService: AuthService,
		private router: Router
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => {
			return false;
		};
	}

	ngOnInit(): void {
		this.activeRoute = this.router.url;
		const limitCategoriesTo = this.activeRoute === '/' ? 16 : undefined;

		this.categoryService.getCategories(limitCategoriesTo).subscribe((data) => {
			this.categories = data.categories;
		});
		this.authStatusSub = this.authService
			.getAuthStatusListener()
			.subscribe((isAuthenticated) => {
				this.userIsAuthenticated = isAuthenticated;
			});
	}

	ngOnDestroy(): void {
		this.authStatusSub.unsubscribe();
	}
}
