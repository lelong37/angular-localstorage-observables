import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

interface ICache { [key: string]: BehaviorSubject<any> };

@Injectable()
export class LocalStorageService {
  private cache: ICache;  

  constructor() {
    this.cache = null;
  }

  setItem<T>(key: string, value: T): BehaviorSubject<T> {
    if (this.cache[key]) {
      this.cache[key].next(value);
      return this.cache[key];
    }
    return this.cache[key] = new BehaviorSubject(value);
  }

  getItem<T>(key: string): BehaviorSubject<T> | null {
    if (this.cache[key])
      return this.cache[key];
  }
}