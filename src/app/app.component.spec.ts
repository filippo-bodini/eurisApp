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

});
