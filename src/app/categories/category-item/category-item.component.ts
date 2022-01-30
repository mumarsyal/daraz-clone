import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Category } from '../category.model';
import { AuthService } from '../../auth/auth.service';
import { CategoryService } from '../category.service';

@Component({
	selector: 'app-category-item',
	templateUrl: './category-item.component.html',
	styleUrls: [
		'./category-item.component.css',
		'../category-list/category-list.component.css',
	],
})
export class CategoryItemComponent implements OnInit {
	@Input() category: Category;
	userIsAuthenticated: boolean = false;
	activeRoute: string = null;
	private authStatusSub: Subscription;

	constructor(
		private categoryService: CategoryService,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activeRoute = this.router.url;
		this.authStatusSub = this.authService
			.getAuthStatusListener()
			.subscribe((isAuthenticated) => {
				this.userIsAuthenticated = isAuthenticated;
			});
	}

	onDeleteCategory(id: string) {
		this.categoryService.deleteCategory(id).subscribe((result) => {
			this.router.navigate(['/categories']);
		});
	}

	ngOnDestroy(): void {
		this.authStatusSub.unsubscribe();
	}
}
