export interface Product {
	_id?: string;
	title: string;
	thumbnail: string;
	rating?: number;
	noOfRatings?: number;
	noOfQuesAsked?: number;
	noOfQuesAnswered?: number;
	brand?: string;
	currentPrice: number;
	oldPrice?: number;
	freeShipping?: boolean;
	colors?: [string];
	features: [string];
	description?: string;
	images: [string];
	sku: string;
	model: string;
	material: string;
	inTheBox: [string];
	category: string;
	seller: string;
	reviews?: [string];
}
