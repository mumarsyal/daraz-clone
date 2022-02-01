import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
	loading: boolean = false;
	deleteInfo: {
		categoryId: string;
		categoryTitle: string;
		showDialog: string;
	} = {
		categoryId: '',
		categoryTitle: '',
		showDialog: 'none',
	};
	activeRoute: string = null;
	categories: Category[] = [];

	constructor(
		private categoryService: CategoryService,
		private router: Router
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => {
			return false;
		};
	}

	ngOnInit(): void {
		this.loading = true;
		this.activeRoute = this.router.url;
		const limitCategoriesTo = this.activeRoute === '/' ? 16 : undefined;

		this.categoryService.getCategories(limitCategoriesTo).subscribe((data) => {
			this.categories = data.categories;
			this.loading = false;
		});
	}

	onShowModal(event: {
		categoryId: string;
		categoryTitle: string;
		showDialog: boolean;
	}) {
		this.deleteInfo.categoryId = event.categoryId;
		this.deleteInfo.categoryTitle = event.categoryTitle;
		this.deleteInfo.showDialog = event.showDialog ? 'block' : 'none';
	}

	onCloseModal() {
		this.deleteInfo = {
			categoryId: '',
			categoryTitle: '',
			showDialog: 'none',
		};
	}

	onConfirmDeleteCategory() {
		this.loading = true;
		this.categoryService
			.deleteCategory(this.deleteInfo.categoryId)
			.subscribe((result) => {
				this.router.navigate(['/categories']);
			});
	}
}
