import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Category } from './category.model';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private categoriesApiUrlPrefix = environment.apiUrlPrefix + 'categories/';

	constructor(private http: HttpClient) {}

	addCategory(category: Category) {
		const categoryData = new FormData();
		categoryData.append('title', category.title);
		categoryData.append('image', category.image, category.title);
		return this.http.post<{ message: string }>(
			`${this.categoriesApiUrlPrefix}`,
			categoryData
		);
	}

	getCategories(limit?: number) {
		const queryParams = `?limit=${limit}`;

		return this.http.get<{
			message: string;
			categories: Category[];
			totalCategories: number;
		}>(`${this.categoriesApiUrlPrefix}` + queryParams);
	}
}
