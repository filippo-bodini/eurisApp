
import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {environment} from '../../environments/environment';
import {ApiService} from './api/api.service';
import {ApiRequest} from './api/api.type';
import {ProductInterface} from '../interfaces/product.interface';
import {ProductDetailInterface} from '../interfaces/productDetail.interface';
import {StoreInterface} from '../interfaces/store.interface';
import {StatsCategoriesInterface} from '../interfaces/statsCategories.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private logger: LoggerService, private api: ApiService) { }

  // GET /stores
  fetchStores(): Promise<StoreInterface[]> {
    const apiEndpoint = environment.apiStoresEndpoint;
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // GET /stores​/{idStore}
  getSingleStore(): Promise<any> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId;
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // GET /stores​/{idStore}​/products
  getStoreProducts(): Promise<ProductInterface[]> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/products';
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // POST /stores​/{idStore}​/products
  addStoreProduct(data: ProductDetailInterface): Promise<ProductInterface> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/products';
    const request = new ApiRequest('post', apiEndpoint, data);
    return this.api.call(request);
  }

  // GET /stores​/{idStore}​/products​/{idProduct}
  getStoreProduct(productId: string): Promise<ProductInterface> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/products/' + productId;
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // DELETE /stores​/{idStore}​/products​/{idProduct}
  deleteStoreProduct(productId: string): Promise<any> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/products/' + productId;
    const request = new ApiRequest('delete', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // GET /stores​/{idStore}​/stats​/categories
  getStoreStats(): Promise<StatsCategoriesInterface[]> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/stats/categories';
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }


}
