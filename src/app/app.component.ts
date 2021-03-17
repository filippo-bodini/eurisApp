import { Component, OnInit } from '@angular/core';
import { DataService } from './common/data.service';
import {ProductState} from './store/state';
import {Observable} from 'rxjs';
import {selectProductState} from './store/selectors';
import {select, Store} from '@ngrx/store';
import {fetchProducts, fetchStoreInfo, saveProduct} from './store/actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductDetailInterface} from './interfaces/productDetail.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  mobileMenuOpened = false;
  submitNewProductHasErrors = false;
  inputProduct: FormGroup | undefined;
  state$: Observable<ProductState>;

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
}
