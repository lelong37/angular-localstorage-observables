# Angular LocalStorage with Observables

<img src="https://user-images.githubusercontent.com/4691404/38349668-c12ac050-386d-11e8-9d20-362d653f6e07.png" width="150" />

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface ICache { [ key: string ]: BehaviorSubject<any>; }
type serializable = object | Object;

@Injectable()
export class LocalStorageService {
  private cache: ICache;

  constructor () {
    this.cache = Object.create( null );
  }

  setItem<T extends serializable>( key: string, value: T ): BehaviorSubject<T> {
    localStorage.setItem( key, JSON.stringify( value ) );

    if ( this.cache[ key ] ) {
      this.cache[ key ].next( value );
      return this.cache[ key ];
    }

    return this.cache[ key ] = new BehaviorSubject( value );
  }

  getItem<T extends serializable>( key: string ): BehaviorSubject<T> {
    if ( this.cache[ key ] )
      return this.cache[ key ];
    else
      return this.cache[ key ] = new BehaviorSubject( JSON.parse( localStorage.getItem( key ) ) );
  }

  removeItem ( key: string ) {
    localStorage.removeItem( key );
    if ( this.cache[ key ] )
      this.cache[ key ].next( undefined );
  }
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
