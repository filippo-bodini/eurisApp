import { HttpClientModule } from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './common/api/api.service';
import { DataService } from './common/data.service';

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

  it(`should have as title the shop name`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    component.ngOnInit();
    expect(app.title).toEqual('Dolci di Piera');
  });

  it('should render title', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('eurisApp app is running!');
  });
});
