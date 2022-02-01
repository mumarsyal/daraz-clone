export interface Review {
	_id?: string;
	reviewBy: string;
	rating?: number;
	verifiedPurchase?: boolean;
	reviewDate: Date;
	comment: string;
	product: string;
}
