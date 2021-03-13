
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
  fetchStores(): Promise<any> {
    const apiEndpoint = environment.apiStoresEndpoint;
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      this.logger.warn(error);
      return [];
    });
  }

  // GET /stores​/{idStore}
  // GET /stores​/{idStore}​/products
  // POST /stores​/{idStore}​/products
  // GET /stores​/{idStore}​/products​/{idProduct}
  // DELETE /stores​/{idStore}​/products​/{idProduct}
  // GET /stores​/{idStore}​/stats​/categories



}
