import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
	],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
