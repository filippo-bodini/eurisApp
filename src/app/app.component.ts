import { Component, OnInit } from '@angular/core';
import { DataService } from './common/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Dolci di Piera';
  mobileMenuOpened = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.mobileMenuOpened = false;
    this.dataService.fetchStores().then(
      result => {
        if (result && result[0] && result[0].data && result[0].data.name) {
          this.title = result[0].data.name;
        }
        this.title = result[0].data.name ? result[0].data.name : '';
      }
    );
  }

}
