import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddCategoryComponent } from './categories-admin/add-category/add-category.component';
import { CategoriesAdminComponent } from './categories-admin/categories-admin.component';
import { CategoriesComponent } from './home-page/categories/categories.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent, pathMatch: 'full' },
	{
		path: 'products',
		component: ProductsComponent,
		children: [
			{ path: '', component: ProductsListComponent },
			{ path: 'detail', component: ProductDetailComponent },
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
	{ path: 'categories', component: CategoriesAdminComponent, children: [
		{ path: '', component: CategoriesComponent },
		{ path: 'new', component: AddCategoryComponent }
	] },

	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [LoggedInAuthGuard],
})
export class AppRoutingModule {}
