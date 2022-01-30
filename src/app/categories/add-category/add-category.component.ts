import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { imageMimeTypeValidator } from '../../shared/image-mimetype.validator';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
	selector: 'app-add-category',
	templateUrl: './add-category.component.html',
	styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
	categoryForm: FormGroup;
	imagePreview: string;

	constructor(
		private http: HttpClient,
		private router: Router,
		private categoryService: CategoryService
	) {}

	ngOnInit(): void {
		this.categoryForm = new FormGroup({
			title: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)],
			}),
			image: new FormControl(null, {
				validators: [Validators.required],
				asyncValidators: [imageMimeTypeValidator],
			}),
		});
	}

	onImageSelected(event: Event) {
		if (
			!(event.target as HTMLInputElement).files ||
			!(event.target as HTMLInputElement).files[0]
		) {
			return;
		}
		const file = (event.target as HTMLInputElement).files[0];
		this.categoryForm.patchValue({ image: file });
		this.categoryForm.get('image').updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result as string;
		};
		reader.readAsDataURL(file);
	}

	onAddCategory() {
		if (this.categoryForm.invalid) {
			return;
		}
		const category: Category = {
			title: this.categoryForm.value.title,
			image: this.categoryForm.value.image,
		};
		this.categoryService.addCategory(category).subscribe(
			(data) => {
				this.router.navigate(['/categories']);
			},
			(error) => {
				this.categoryForm.setErrors({
					'server-error': error.error.message,
				});
			}
		);
	}
}
