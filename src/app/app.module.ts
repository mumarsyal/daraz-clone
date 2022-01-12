import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FranchisesComponent } from './franchises/franchises.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { CollectionsComponent } from './collections/collections.component';
import { MallComponent } from './mall/mall.component';
import { CategoriesComponent } from './categories/categories.component';
import { ForYouComponent } from './for-you/for-you.component';
import { FooterComponent } from './footer/footer.component';
import { SiteMapComponent } from './footer/site-map/site-map.component';

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
    FooterComponent,
    SiteMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
