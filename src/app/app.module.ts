import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BarRatingModule } from 'ngx-bar-rating';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './home-page/carousel/carousel.component';
import { FranchisesComponent } from './home-page/franchises/franchises.component';
import { FlashSaleComponent } from './home-page/flash-sale/flash-sale.component';
import { CollectionsComponent } from './home-page/collections/collections.component';
import { MallComponent } from './home-page/mall/mall.component';
import { CategoriesComponent } from './categories/categories.component';
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
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { CategoryItemComponent } from './categories/category-item/category-item.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddProductComponent } from './products/add-product/add-product.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';

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
		AddCategoryComponent,
		CategoryItemComponent,
		CategoryListComponent,
		AddProductComponent,
		DateAgoPipe,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BarRatingModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatPaginatorModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
