import { Component, OnInit } from '@angular/core';
import { DataService } from './common/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'eurisApp';

  constructor(private dataService: DataService) {}
  ngOnInit() {
    const productExample = {
      title :	'Beer',
      category : 'Drinks',
      price : 3,
      employee :	'Mark',
      description :	'Lager'
    }
    if(productExample) {
      this.dataService.addStoreProduct(productExample).then((item: any) => {
        console.log(item);
      });
    }



  }

  testApiCalls() {
    this.dataService.fetchStores().then((item: any) => {
      console.log(item);
      this.dataService.getSingleStore().then((item: any) => {
        console.log(item);
        this.dataService.getStoreProducts().then((item: any) => {
          console.log(item);
          this.dataService.getStoreStats().then((item: any) => {
            console.log(item);
            const productExample = {
              title :	'Beer',
              category : 'Drinks',
              price : 3,
              employee :	'Mark',
              description :	'Lager'
            }
            this.dataService.addStoreProduct(productExample).then((item: any) => {
              console.log(item);
              const productToDelete = '1QxR4LWyIPez1IHyV8fQ';
              this.dataService.deleteStoreProduct(productToDelete).then((response) => {
                console.log(response);
              });
            });
          });
        });
      });
    });
  }
}
