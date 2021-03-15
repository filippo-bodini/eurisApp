import {createAction, props, union} from '@ngrx/store';
import {ProductInterface} from '../interfaces/product.interface';

export enum ProductListActionTypes {
  PRODUCT_LIST_RESET = '[PRODUCT-LIST] Reset',
  PRODUCT_LIST_ADD_PRODUCT = '[PRODUCT-LIST] Add a single product and store',
  PRODUCT_LIST_DELETE_PRODUCT = '[PRODUCT-LIST] Delete a single product and store',
  PRODUCT_LIST_COMPLETE = '[PRODUCT-LIST] Adds all products to the list',
  PRODUCT_LIST_API_ADD_PRODUCT = '[PRODUCT-LIST] Save item with API call',
  PRODUCT_LIST_API_FETCH_PRODUCTS = '[PRODUCT-LIST] Fetch products from API',
  PRODUCT_LIST_API_DELETE_PRODUCT = '[PRODUCT-LIST] delete product with API call',
}
export const listReset = createAction(ProductListActionTypes.PRODUCT_LIST_RESET);
export const listAddProduct = createAction(ProductListActionTypes.PRODUCT_LIST_ADD_PRODUCT, props<{ newProduct: ProductInterface }>());
export const listRemoveProduct = createAction(ProductListActionTypes.PRODUCT_LIST_DELETE_PRODUCT, props<{ product: ProductInterface }>());
export const listComplete = createAction(ProductListActionTypes.PRODUCT_LIST_COMPLETE, props<{ products: ProductInterface[] }>());
export const saveProduct = createAction(ProductListActionTypes.PRODUCT_LIST_API_ADD_PRODUCT, props<{ newProduct: ProductInterface }>());
export const deleteProduct = createAction(ProductListActionTypes.PRODUCT_LIST_API_DELETE_PRODUCT, props<{ product: ProductInterface }>());
export const fetchProducts = createAction(ProductListActionTypes.PRODUCT_LIST_API_FETCH_PRODUCTS);


const all = union({
  listReset,
  listAddProduct,
  listComplete,
  listRemoveProduct,
  saveProduct,
  deleteProduct,
  fetchProducts,
});

export type ProductListActionUnion = typeof all;
