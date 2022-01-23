import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { LoggedOutAuthGuard } from './auth/logged-out-auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent, pathMatch: 'full' },
	{
		path: 'products',
		component: ProductsComponent,
		children: [
			{ path: '', component: ProductsListComponent },
			{ path: 'detail/:id', component: ProductDetailComponent },
		],
	},
	{
		path: 'signup',
		component: SignupComponent,
		canActivate: [LoggedInAuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LoggedInAuthGuard],
	},
	{
		path: 'categories',
		component: CategoriesComponent,
		children: [
			{ path: '', component: CategoryListComponent },
			{
				path: 'new',
				component: AddCategoryComponent,
				canActivate: [LoggedOutAuthGuard],
			},
		],
	},

	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
	exports: [RouterModule],
	providers: [LoggedInAuthGuard, LoggedOutAuthGuard],
})
export class AppRoutingModule {}
