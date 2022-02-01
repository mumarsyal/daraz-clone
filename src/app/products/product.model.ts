import { Category } from '../categories/category.model';
import { Seller } from '../shared/seller.model';
import { Review } from './review.model';

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
	images: [string | File];
	sku: string;
	model: string;
	material: string;
	inTheBox: [string];
	category: Category;
	seller: Seller;
	reviews?: [Review];
}
