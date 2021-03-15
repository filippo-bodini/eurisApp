import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  isProduction: boolean;

  constructor() {
    this.isProduction = environment.production;
  }

  public warn(message: string): void {
    if (!this.isProduction) {
      console.warn(message);
    }
  }

  public log(message: string): void {
    if (!this.isProduction) {
      console.log(message);
    }
  }

  public error(message: string): void {
    if (!this.isProduction) {
      console.error(message);
    }
  }
}