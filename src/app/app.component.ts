import { Component, OnInit } from '@angular/core';
import { DataService } from './common/data.service';
import {ProductState} from './store/state';
import {Observable} from 'rxjs';
import {selectProductState} from './store/selectors';
import {select, Store} from '@ngrx/store';
import {fetchProducts} from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Dolci di Piera';
  mobileMenuOpened = false;
  state$: Observable<ProductState>;

  constructor(private dataService: DataService, private readonly store: Store<ProductState>) {
    this.state$ = this.store.pipe(
      select(selectProductState),
    );
  }

  ngOnInit(): void {
    this.mobileMenuOpened = false;
    this.fetchProducts();
  }

  public fetchProducts(): void {
    this.store.dispatch(fetchProducts());
  }

}
