import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { LocalStorageService } from './services/local-storage.service';

@NgModule( {
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap: [ AppComponent ],
  providers: [ LocalStorageService ]
} )
export class AppModule { }
