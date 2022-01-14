import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

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

	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
