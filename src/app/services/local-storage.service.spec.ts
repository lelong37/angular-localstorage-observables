import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

const storageKey = 'scopes';
const scopes = [ 'edit:messages', 'approve:budget', 'read:dashboard' ];

describe( 'LocalStorageService with Observable Pattern test suite', () => {
  let service: LocalStorageService;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers: [ LocalStorageService ]
    } );

    service = TestBed.get( LocalStorageService );

    let store = {};
    const mockLocalStorage = {
      getItem: ( key: string ): string => {
        return key in store ? store[ key ] : null;
      },
      setItem: ( key: string, value: string ) => {
        store[ key ] = `${ value }`;
      },
      removeItem: ( key: string ) => {
        delete store[ key ];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn( localStorage, 'getItem' )
      .and.callFake( mockLocalStorage.getItem );
    spyOn( localStorage, 'setItem' )
      .and.callFake( mockLocalStorage.setItem );
    spyOn( localStorage, 'removeItem' )
      .and.callFake( mockLocalStorage.removeItem );
    spyOn( localStorage, 'clear' )
      .and.callFake( mockLocalStorage.clear );
  } );

  it( 'should create the service', () => {
    expect( service ).toBeTruthy();
  } );

  describe( 'setItem', () => {
    it( 'should serialize and store the scopes in localStorage',
      () => {
        service.setItem( this.key, this.scopes ).subscribe( x =>
          expect( x ).toEqual( this.scopes ) );
      } );
  } );

  describe( 'getItem', () => {
    it( 'should retrieve, deserialize scopes in localStorage and returns subscription for any changes there on after',
      () => {
        service.setItem( this.key, this.scopes ).subscribe( x => {
          service.getItem( this.key ).subscribe( y => {
            expect( y ).toEqual( this.scopes );
          } );
        } );
      } );
  } );

  describe( 'removeItem', () => {
    it( 'should remove scopes in localStorage and notify all subscribers, and subscription payload will be null for removal',
      () => {
        service.removeItem( this.key );
        service.getItem( this.key ).subscribe( x => {
          expect( x ).toEqual( null );
        });
      } );
  } );
} );
