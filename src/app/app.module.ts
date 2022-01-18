import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './home-page/carousel/carousel.component';
import { FranchisesComponent } from './home-page/franchises/franchises.component';
import { FlashSaleComponent } from './home-page/flash-sale/flash-sale.component';
import { CollectionsComponent } from './home-page/collections/collections.component';
import { MallComponent } from './home-page/mall/mall.component';
import { CategoriesComponent } from './home-page/categories/categories.component';
import { ForYouComponent } from './home-page/for-you/for-you.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { FindUsComponent } from './find-us/find-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { CategoriesAdminComponent } from './categories-admin/categories-admin.component';
import { AddCategoryComponent } from './categories-admin/add-category/add-category.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		CarouselComponent,
		FranchisesComponent,
		FlashSaleComponent,
		CollectionsComponent,
		MallComponent,
		CategoriesComponent,
		ForYouComponent,
		SiteMapComponent,
		FindUsComponent,
		HomePageComponent,
		ProductsComponent,
		ProductsListComponent,
		ProductItemComponent,
		ProductDetailComponent,
		SignupComponent,
		LoginComponent,
		CategoriesAdminComponent,
  AddCategoryComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
