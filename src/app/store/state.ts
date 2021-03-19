import {ProductInterface} from '../interfaces/product.interface';
import {StatsCategoriesInterface} from '../interfaces/statsCategories.interface';

export interface ProductState {
  shopName: string;
  storeStats: StatsCategoriesInterface[]; // list of stats categories
  ready: boolean;                         // List is ready to be seen
  results: ProductInterface[];            // Bookable products
  numResults: number;                     // Total number of found results
}
