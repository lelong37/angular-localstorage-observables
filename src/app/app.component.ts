import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service'

interface ICustomer { id: number, name: string };

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {

    const name = 'Angular 5';

    let customers = new Array<ICustomer>(
      { id: 1, name: 'Tony Sneed' },
      { id: 2, name: 'Long Le' }
    );

    const key = 'customers';

    const log = (x: any) => {
      customers = x;
      console.table(customers);
    };

    this.localStorageService.setItem(key, customers)
      .subscribe(log);

    this.localStorageService.getItem(key)
      .subscribe(log);

    this.localStorageService.setItem(key, customers)
      .subscribe(log);

  }

}