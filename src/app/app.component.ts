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
    this.dataService.fetchStores().then((item: any) => {
      console.log(item);
    })
  }
}
