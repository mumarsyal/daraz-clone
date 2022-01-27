import { Product } from '../products/product.model';

export interface Seller {
	_id?: string;
	name: string;
	positiveRatings: number;
	shipOnTime: number;
	chatResponse: number;
	products?: Product[];
}
