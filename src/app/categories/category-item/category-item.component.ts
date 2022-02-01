import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
	@Output() confirmDelete = new EventEmitter<{
		categoryId: string;
		categoryTitle: string;
		showDialog: boolean;
	}>();

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

	onDeleteCategory() {
		this.confirmDelete.emit({
			categoryId: this.category._id,
			categoryTitle: this.category.title,
			showDialog: true,
		});
	}

	ngOnDestroy(): void {
		this.authStatusSub.unsubscribe();
	}
}
