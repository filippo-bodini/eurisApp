import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductState} from './state';
import {select, Store} from '@ngrx/store';
import {
  fetchProducts,
  listAddProduct,
  listAddStore, listAddStoreStats,
  listComplete,
  listRemoveProduct, listSetLoading,
  ProductListActionTypes,
  ProductListActionUnion
} from './actions';
import {concatMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {selectProductState} from './selectors';
import {DataService} from '../common/data.service';
import {environment} from '../../environments/environment';
import {StoreInterface} from '../interfaces/store.interface';



@Injectable()
export class ProductEffects {

  saveItem$ = createEffect(() => this.actions$.pipe(
    ofType(ProductListActionTypes.PRODUCT_LIST_API_ADD_PRODUCT),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectProductState)))
    )),
    tap(([action, state]) => {
      this.store$.dispatch(listSetLoading());
      this.dataService.addStoreProduct(action.newProduct).then((result) => {
        this.store$.dispatch(listAddProduct({newProduct: result}));
      }).catch((error) => {
        // for an unknown reason (for now) it rejects API call but stores item. Until it's fixed, i can refresh the product list
        // todo: remove after fixing
        this.dataService.getStoreProducts().then(
          (results) => {
            this.store$.dispatch(listComplete({products: results}));
          }
        );
      });
    }),
    ),
    { dispatch: false });

  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(ProductListActionTypes.PRODUCT_LIST_API_DELETE_PRODUCT),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectProductState)))
    )),
    tap(([productId, state]) => {
      this.store$.dispatch(listSetLoading());
      this.dataService.deleteStoreProduct(productId.productId).then((result) => {
        this.store$.dispatch(listRemoveProduct({productId: productId.productId}));
      });
    }),
    ),
    { dispatch: false });

  fetchItems$ = createEffect(() => this.actions$.pipe(
    ofType(ProductListActionTypes.PRODUCT_LIST_API_FETCH_PRODUCTS),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectProductState)))
    )),
    tap(() => {
      this.store$.dispatch(listSetLoading());
      const products = this.dataService.getStoreProducts().then(
        (results) => {
          this.store$.dispatch(listComplete({products: results}));
        }
      );
    }),
    ),
    { dispatch: false });

  fetchStoreInfo$ = createEffect(() => this.actions$.pipe(
    ofType(ProductListActionTypes.PRODUCT_LIST_API_FETCH_STORE),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectProductState)))
    )),
    tap(() => {
      this.store$.dispatch(listSetLoading());
      const products = this.dataService.getSingleStore().then(
        (result) => {
          const shop = {
            id: environment.storeId,
            data: result
          } as StoreInterface;
          this.store$.dispatch(listAddStore({store: shop}));
        }
      );
    }),
    ),
    { dispatch: false });

  fetchStoreStats$ = createEffect(() => this.actions$.pipe(
    ofType(ProductListActionTypes.PRODUCT_LIST_API_FETCH_STORE_STATS),
    // Import latest state
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store$.pipe(select(selectProductState)))
    )),
    tap(() => {
      this.store$.dispatch(listSetLoading());
      const products = this.dataService.getStoreStats().then(
        (result) => {
          this.store$.dispatch(listAddStoreStats({stats: result}));
        }
      );
    }),
    ),
    { dispatch: false });

  constructor(
    private readonly store$: Store<ProductState>,
    private readonly actions$: Actions<ProductListActionUnion>,
    private readonly dataService: DataService,
  ) {}
}
