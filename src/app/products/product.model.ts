export interface Product {
	_id?: String;
	title: String;
	thumbnail: String;
	rating?: Number;
	noOfRatings?: Number;
	noOfQuesAsked?: Number;
	noOfQuesAnswered?: Number;
	brand?: String;
	currentPrice: Number;
	oldPrice?: Number;
	freeShipping?: Boolean;
	colors?: [String];
	features: [String];
	description?: String;
	images: [String];
	sku: String;
	model: String;
	material: String;
	inTheBox: [String];
	category: String;
	seller: String;
	reviews?: [String];
}
