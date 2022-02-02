import { Component, OnInit } from '@angular/core';

import { Product } from '../../products/product.model';
import { ProductService } from '../../products/product.service';

@Component({
	selector: 'app-for-you',
	templateUrl: './for-you.component.html',
	styleUrls: ['./for-you.component.css'],
})
export class ForYouComponent implements OnInit {
	loading: boolean = false;
	productsForYou: Product[] = [];

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.loading = true;

		this.productService
			.getProducts({ pageSize: 12, pageNum: 1 })
			.subscribe((result) => {
				this.productsForYou = result.products;
				this.loading = false;
			});
	}
}
