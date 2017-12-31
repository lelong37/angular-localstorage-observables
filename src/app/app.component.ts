import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {

    const name = 'Angular 5';

    let scopes = new Array<string>(
      'read:messages',
      'edit:messages',
      'read:reports'
    );

    const key = 'scopes';

    const log = (x: any) => {
      scopes = x;
      console.table(scopes);
    };

    this.localStorageService.setItem(key, scopes)
      .subscribe(log);

    this.localStorageService.getItem(key)
      .subscribe(log);

    this.localStorageService.setItem(key, scopes)
      .subscribe(log);

  }

}
