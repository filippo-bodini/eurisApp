
import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {environment} from '../../environments/environment';
import {ApiService} from './api/api.service';
import {ApiRequest} from './api/api.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private logger: LoggerService, private api: ApiService) { }

  // GET /stores
  fetchStores(): Promise<any[]> {
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
  getStoreProducts(): Promise<any> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/products';
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // POST /stores​/{idStore}​/products
  addStoreProduct(data: any): Promise<any> {
    debugger;
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/products';
    const request = new ApiRequest('post', apiEndpoint, JSON.parse(JSON.stringify(data)));
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // GET /stores​/{idStore}​/products​/{idProduct}
  getStoreProduct(productId: string): Promise<any> {
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
  getStoreStats(): Promise<any> {
    const apiEndpoint = environment.apiStoresEndpoint + '/' + environment.storeId + '/stats/categories';
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }


}
