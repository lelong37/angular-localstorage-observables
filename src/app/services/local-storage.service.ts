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
