import { HttpClientModule } from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './common/api/api.service';
import { DataService } from './common/data.service';
import {StoreModule} from '@ngrx/store';
import * as ProductReducer from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {ProductEffects} from './store/effects';
import {FormBuilder} from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let compiled;
  const storeResult = [
    {
      id: 'ijpxNJLM732vm8AeajMR',
      data: {
        employees: [
          'Aldo',
          'Giovanni',
          'Giacomo'
        ],
        name: 'Dolci di Piera',
        category: 'pasticceria'
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', ProductReducer.reducer),
        EffectsModule.forRoot(),
        EffectsModule.forFeature([ProductEffects])
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        FormBuilder,
        DataService,
        ApiService]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get(ApiService);
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should exist a form where you can add a product', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('#new-product-form')).toBeTruthy();
  });

  it('form should have a submit button', () => {
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('#new-product-submit')).toBeTruthy();
  });

  it('if should display an error message if submit fails', () => {
    compiled = fixture.nativeElement;
    component.submitNewProductHasErrors = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#new-product-errors')).toBeTruthy();
  });
  // maybe better to test with  cypress
  // it('if should change layout after clicking on buttons', () => {
  //   compiled = fixture.nativeElement;
  //   fixture.detectChanges();
  //   compiled.querySelector('#grid-selector').click();
  //   fixture.detectChanges();
  //   expect(compiled.querySelector('#grid-container')).toBeTruthy();
  //   expect(compiled.querySelector('#grid-selector')).toBeFalsy();
  //   expect(compiled.querySelector('#list-container')).toBeFalsy();
  //   compiled.querySelector('#list-container').click();
  //   fixture.detectChanges();
  //   expect(compiled.querySelector('#list-container')).toBeTruthy();
  //   expect(compiled.querySelector('#grid-container')).toBeFalsy();
  //   expect(compiled.querySelector('#grid-selector')).toBeTruthy();
  // });
});
