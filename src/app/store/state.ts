import {ProductInterface} from '../interfaces/product.interface';

export interface ProductState {
  ready: boolean;                         // List is ready to be seen
  results: ProductInterface[];            // Bookable products
  numResults: number;                     // Total number of found results
}
