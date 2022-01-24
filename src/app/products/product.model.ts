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
	category: {
		_id?: string;
		title: string;
		imagePath: string;
		products?: Product[];
	};
	seller: {
		_id?: string;
		name: string;
		positiveRatings: number;
		shipOnTime: number;
		chatResponse: number;
		products?: Product[];
	};
	reviews?: [
		{
			_id?: string;
			reviewBy: string;
			rating?: number;
			verifiedPurchase?: boolean;
			reviewDate?: Date;
			comment: string;
			product: Product;
		}
	];
}
