import { Product } from '../products/product.model';

export interface Category {
	title: string;
	image?: File;
	imagePath?: string;
	_id?: string;
	products?: Product[];
}
