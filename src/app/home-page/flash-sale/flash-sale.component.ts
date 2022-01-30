import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-flash-sale',
	templateUrl: './flash-sale.component.html',
	styleUrls: ['./flash-sale.component.css'],
})
export class FlashSaleComponent implements OnInit {
	saleItems = [
		{
			image_src: 'assets/images/flash-sale/shea-butter.jpg',
			title: 'MHB Shea Butter Cream - Anti-Aging Anti-Wrinkle - SPF 50',
			price: 1999,
			orig_price: 2500,
			discount: ((2500 - 1999) / 2500) * 100,
		},
		{
			image_src: 'assets/images/flash-sale/cable-safety.jpg',
			title: '20 Pcs Crystal Cable Safety Wire Organizer Clips Cable Management Laptop / Desktop & Workstation ABS Wire Manager Cord Holder USB Charging Data Line Bobbin Winder',
			price: 99,
			orig_price: 399,
			discount: ((399 - 99) / 399) * 100,
		},
		{
			image_src: 'assets/images/flash-sale/earphone.jpg',
			title: 'Woofer Laptop or Mobile EarPhones',
			price: 76,
			orig_price: 249,
			discount: ((249 - 76) / 249) * 100,
		},
		{
			image_src: 'assets/images/flash-sale/drawer-organisers.jpg',
			title: 'BELIVO Pack of 4 Drawer Organisers, Drawer Dividers, Closet Organizer, Size 12.5 x 2.5 Inch home decor wardrobe short box clothes dividers plastic box for storage adjustable Drawer Organizer Board Storage Boxes',
			price: 175,
			orig_price: 550,
			discount: ((550 - 175) / 550) * 100,
		},
		{
			image_src: 'assets/images/flash-sale/food-containers.jpg',
			title: 'Millat Food Storage Container Boxes (3 Pcs Large Liner Boxes)',
			price: 161,
			orig_price: 189,
			discount: ((189 - 161) / 189) * 100,
		},
		{
			image_src: 'assets/images/flash-sale/charcoal-powder.jpg',
			title: 'Activated Charcoal Powder Teeth Whitening, Facial Face Pack, Blackheads Remover, Deep Cleanses & Detoxifies Skin & Hair 100 Gram',
			price: 127,
			orig_price: 350,
			discount: ((350 - 127) / 350) * 100,
		},
	];

	constructor() {}

	ngOnInit(): void {}
}
