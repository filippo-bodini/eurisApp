import {createAction, props, union} from '@ngrx/store';
import {ProductInterface} from '../interfaces/product.interface';
import {StoreInterface} from '../interfaces/store.interface';
import {ProductDetailInterface} from '../interfaces/productDetail.interface';
import {StatsCategoriesInterface} from '../interfaces/statsCategories.interface';

export enum ProductListActionTypes {
  PRODUCT_LIST_RESET = '[PRODUCT-LIST] Reset',
  PRODUCT_LIST_ADD_PRODUCT = '[PRODUCT-LIST] Add a single product and store',
  PRODUCT_LIST_ADD_STORE = '[PRODUCT-LIST] Add a single store',
  PRODUCT_LIST_ADD_STORE_STATS = '[PRODUCT-LIST] Add store stats',
  PRODUCT_LIST_DELETE_PRODUCT = '[PRODUCT-LIST] Delete a single product and store',
  PRODUCT_LIST_COMPLETE = '[PRODUCT-LIST] Adds all products to the list',
  PRODUCT_LIST_SET_LOADING = '[PRODUCT-LIST] Set not ready until other operation are not done',
  PRODUCT_LIST_API_ADD_PRODUCT = '[PRODUCT-LIST] Save item with API call',
  PRODUCT_LIST_API_FETCH_PRODUCTS = '[PRODUCT-LIST] Fetch products from API',
  PRODUCT_LIST_API_DELETE_PRODUCT = '[PRODUCT-LIST] delete product with API call',
  PRODUCT_LIST_API_FETCH_STORE = '[PRODUCT-LIST] fetch store info from API',
  PRODUCT_LIST_API_FETCH_STORE_STATS = '[PRODUCT-LIST] fetch store stats from API'
}
export const listReset = createAction(ProductListActionTypes.PRODUCT_LIST_RESET);
export const listAddStore = createAction(ProductListActionTypes.PRODUCT_LIST_ADD_STORE, props<{ store: StoreInterface }>());
export const listAddStoreStats = createAction(ProductListActionTypes.PRODUCT_LIST_ADD_STORE_STATS, props<{ stats: StatsCategoriesInterface[] }>());
export const listAddProduct = createAction(ProductListActionTypes.PRODUCT_LIST_ADD_PRODUCT, props<{ newProduct: ProductInterface }>());
export const listRemoveProduct = createAction(ProductListActionTypes.PRODUCT_LIST_DELETE_PRODUCT, props<{ productId: string }>());
export const listComplete = createAction(ProductListActionTypes.PRODUCT_LIST_COMPLETE, props<{ products: ProductInterface[] }>());
export const listSetLoading = createAction(ProductListActionTypes.PRODUCT_LIST_SET_LOADING);
export const saveProduct = createAction(ProductListActionTypes.PRODUCT_LIST_API_ADD_PRODUCT, props<{newProduct: ProductDetailInterface}>());
export const deleteProduct = createAction(ProductListActionTypes.PRODUCT_LIST_API_DELETE_PRODUCT, props<{ productId: string }>());
export const fetchProducts = createAction(ProductListActionTypes.PRODUCT_LIST_API_FETCH_PRODUCTS);
export const fetchStoreInfo = createAction(ProductListActionTypes.PRODUCT_LIST_API_FETCH_STORE);
export const fetchStoreStats = createAction(ProductListActionTypes.PRODUCT_LIST_API_FETCH_STORE_STATS);


const all = union({
  listReset,
  listAddProduct,
  listAddStore,
  listAddStoreStats,
  listComplete,
  listRemoveProduct,
  listSetLoading,
  saveProduct,
  deleteProduct,
  fetchProducts,
  fetchStoreInfo,
  fetchStoreStats
});

export type ProductListActionUnion = typeof all;
