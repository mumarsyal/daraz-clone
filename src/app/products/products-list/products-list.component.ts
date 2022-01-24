import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

import { ProductService } from '../product.service';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
	loading: boolean = false;
	products: Product[] = [];
	totalProducts: Number = 0;

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.loading = true;
		this.productService.getProducts().subscribe((result) => {
			this.products = result.products;
			this.totalProducts = result.totalProducts;
			this.loading = false;
		});
	}
}
