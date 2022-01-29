import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';
import { Seller } from '../../shared/seller.model';
import { imageMimeTypeValidator } from '../../shared/image-mimetype.validator';
import { environment } from '../../../environments/environment';
import { Product } from '../product.model';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
	productForm: FormGroup;
	imagePreviews: string[] = [];
	loadingSellers: boolean = false;
	loadingCategories: boolean = false;
	sellers: Seller[] = [];
	categories: Category[] = [];
	maxFilesAllowedToUpload: number;

	constructor(
		private router: Router,
		private productService: ProductService,
		private categoryService: CategoryService
	) {}

	ngOnInit(): void {
		this.loadingSellers = true;
		this.loadingCategories = true;
		this.maxFilesAllowedToUpload = environment.maxFilesAllowedToUpload;

		this.productService.getSellers().subscribe((result) => {
			this.sellers = result.sellers;
			this.productForm.addControl(
				'seller',
				new FormControl(null, {
					validators: [Validators.required],
				})
			);
			this.loadingSellers = false;
		});

		this.categoryService.getCategories().subscribe((result) => {
			this.categories = result.categories;
			this.productForm.addControl(
				'category',
				new FormControl(null, {
					validators: [Validators.required],
				})
			);
			this.loadingCategories = false;
		});

		this.productForm = new FormGroup({
			title: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)],
			}),
			brand: new FormControl(null),
			currentPrice: new FormControl(null, {
				validators: [Validators.required, Validators.min(1)],
			}),
			oldPrice: new FormControl(null, {
				validators: [Validators.min(1)],
			}),
			freeShipping: new FormControl(false),
			colors: new FormControl(null), //
			features: new FormControl(null, {
				validators: [Validators.required],
			}), //
			description: new FormControl(null),
			images: new FormControl(null, {
				validators: [Validators.required],
				asyncValidators: [imageMimeTypeValidator],
			}),
			sku: new FormControl(null, {
				validators: [Validators.required],
			}),
			model: new FormControl(null, {
				validators: [Validators.required],
			}),
			material: new FormControl(null, {
				validators: [Validators.required],
			}),
			inTheBox: new FormControl(null, {
				validators: [Validators.required],
			}), //
		});
	}

	onImagesSelected(event: Event) {
		if (!(event.target as HTMLInputElement).files) {
			return;
		}
		const files = (event.target as HTMLInputElement).files;
		if (files.length > this.maxFilesAllowedToUpload) {
			this.productForm.get('images').setErrors({
				filesMoreThanAllowed: true,
			});
			return;
		}

		this.productForm.patchValue({ images: files });
		this.productForm.get('images').updateValueAndValidity();

		this.imagePreviews = [];
		for (let i = 0; i < files.length; i++) {
			let reader = new FileReader();
			reader.onload = () => {
				this.imagePreviews.push(reader.result as string);
			};
			reader.readAsDataURL(files[i]);
		}
	}

	onAddProduct() {
		if (this.productForm.invalid) {
			return;
		}

		const product: Product = this.productForm.value;
		this.productService.addProduct(product).subscribe(
			(data) => {
				this.router.navigate(['/products']);
			},
			(error) => {
				this.productForm.setErrors({
					'server-error': error.error.message,
				});
			}
		);
	}
}
