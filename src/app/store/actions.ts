import {createAction, props, union} from '@ngrx/store';
import {ProductInterface} from '../interfaces/product.interface';
import {StoreInterface} from '../interfaces/store.interface';

export enum ProductListActionTypes {
  PRODUCT_LIST_RESET = '[PRODUCT-LIST] Reset',
  PRODUCT_LIST_ADD_PRODUCT = '[PRODUCT-LIST] Add a single product and store',
  PRODUCT_LIST_ADD_STORE = '[PRODUCT-LIST] Add a single store',
  PRODUCT_LIST_DELETE_PRODUCT = '[PRODUCT-LIST] Delete a single product and store',
  PRODUCT_LIST_COMPLETE = '[PRODUCT-LIST] Adds all products to the list',
  PRODUCT_LIST_API_ADD_PRODUCT = '[PRODUCT-LIST] Save item with API call',
  PRODUCT_LIST_API_FETCH_PRODUCTS = '[PRODUCT-LIST] Fetch products from API',
  PRODUCT_LIST_API_DELETE_PRODUCT = '[PRODUCT-LIST] delete product with API call',
  PRODUCT_LIST_API_FETCH_STORE = '[PRODUCT-LIST] fetch store info from API'
}
export const listReset = createAction(ProductListActionTypes.PRODUCT_LIST_RESET);
export const listAddStore = createAction(ProductListActionTypes.PRODUCT_LIST_ADD_STORE, props<{ store: StoreInterface }>());
export const listAddProduct = createAction(ProductListActionTypes.PRODUCT_LIST_ADD_PRODUCT, props<{ newProduct: ProductInterface }>());
export const listRemoveProduct = createAction(ProductListActionTypes.PRODUCT_LIST_DELETE_PRODUCT, props<{ product: ProductInterface }>());
export const listComplete = createAction(ProductListActionTypes.PRODUCT_LIST_COMPLETE, props<{ products: ProductInterface[] }>());
export const saveProduct = createAction(ProductListActionTypes.PRODUCT_LIST_API_ADD_PRODUCT, props<{ newProduct: ProductInterface }>());
export const deleteProduct = createAction(ProductListActionTypes.PRODUCT_LIST_API_DELETE_PRODUCT, props<{ product: ProductInterface }>());
export const fetchProducts = createAction(ProductListActionTypes.PRODUCT_LIST_API_FETCH_PRODUCTS);
export const fetchStoreInfo = createAction(ProductListActionTypes.PRODUCT_LIST_API_FETCH_STORE);


const all = union({
  listReset,
  listAddProduct,
  listAddStore,
  listComplete,
  listRemoveProduct,
  saveProduct,
  deleteProduct,
  fetchProducts,
  fetchStoreInfo
});

export type ProductListActionUnion = typeof all;
