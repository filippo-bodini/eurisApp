import { Component, OnInit } from '@angular/core';
import { DataService } from './common/data.service';
import {ProductState} from './store/state';
import {Observable} from 'rxjs';
import {selectProductState} from './store/selectors';
import {select, Store} from '@ngrx/store';
import {deleteProduct, fetchProducts, fetchStoreInfo, fetchStoreStats, saveProduct} from './store/actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductDetailInterface} from './interfaces/productDetail.interface';
import * as Chart from 'chart.js';
import {StatsCategoriesInterface} from './interfaces/statsCategories.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  mobileMenuOpened = false;
  inputProduct: FormGroup | undefined;
  displayMode = 'list';
  state$: Observable<ProductState>;
  newProductIsCollapsed = false;
  statsGraphIsCollapsed = false;
  listElementsIsCollapsed = false;

  constructor(private fb: FormBuilder, private dataService: DataService, private readonly store: Store<ProductState>) {
    this.state$ = this.store.pipe(
      select(selectProductState),
    );
  }

  ngOnInit(): void {
    this.inputProduct = this.fb.group({
      title:	['', Validators.required],
      category:	['', Validators.required],
      price:	[0, Validators.required],
      employee:	['', Validators.required],
      description: ['']
    });
    this.mobileMenuOpened = false;
    this.fetchStoreInfo();
    this.fetchProducts();
    this.fetchProductsStats();
  }

  public fetchProducts(): void {
    this.store.dispatch(fetchProducts());
  }

  public fetchStoreInfo(): void {
    this.store.dispatch(fetchStoreInfo());
  }

  public insertNewProduct(): void {
    if (this.inputProduct) {
      const values = this.inputProduct.getRawValue();
      const newProduct = {
        title:	values.title,
        category:	values.category,
        price:	values.price,
        employee:	values.employee,
        description: values.description,
      } as ProductDetailInterface;
      this.store.dispatch(saveProduct({newProduct}));
    }
  }

  public fetchProductsStats(): void {
    this.store.dispatch(fetchStoreStats());
    this.state$.subscribe((state) => {
      if (state.ready) {
        this.prepareGraph(state.storeStats);
      }
    });

  }

  public prepareGraph(data: StatsCategoriesInterface[]): void {
    const labels = data.map(element => element.category);
    const datasets = data.map(element => element.numberOfProducts);
    const bgColors = data.map(() => {
      return  'rgb(' +  Math.floor(Math.random() * 255) + ',' +
        Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
    });
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [{
          data: datasets,
          backgroundColor: bgColors,
        }],
      }

    });
  }
  public deleteProduct(id: string): void {
    this.store.dispatch(deleteProduct({productId: id}));
  }
}
