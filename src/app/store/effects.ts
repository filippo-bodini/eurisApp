import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductState} from './state';
import {select, Store} from '@ngrx/store';
import {listAddProduct, listAddStore, listComplete, listRemoveProduct, ProductListActionTypes, ProductListActionUnion} from './actions';
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
      this.dataService.addStoreProduct(action.newProduct).then((result) => {
        this.store$.dispatch(listAddProduct({newProduct: result}));
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
    tap(([action, state]) => {
      this.dataService.deleteStoreProduct(action.product.id).then((result) => {
        this.store$.dispatch(listRemoveProduct({product: result}));
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

  constructor(
    private readonly store$: Store<ProductState>,
    private readonly actions$: Actions<ProductListActionUnion>,
    private readonly dataService: DataService,
  ) {}
}
