import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
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
	{ path: 'signup', component: SignupComponent, canActivate: [LoggedInAuthGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },

	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [LoggedInAuthGuard],
})
export class AppRoutingModule {}
