import {createFeatureSelector} from '@ngrx/store';
import {ProductState} from './state';

export const selectProductState = createFeatureSelector<any, ProductState>('product');
