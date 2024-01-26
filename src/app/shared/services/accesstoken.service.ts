import { Injectable } from '@angular/core';
/**
 * @class AccesstokenService
 * @description a service for interacting with access token and local storage
 *
 * @method set @param key - name to set the access token as, defaults to accessToken
 * @method get @param key - name of token to get from localstorage, defaults to accessToken
 * @method clear @param key - name of token to clear from localstorage, defaults to accessToken
 */
@Injectable({
  providedIn: 'root',
})
export class AccesstokenService {
  constructor() {}

  get(key: string = 'accessToken'): unknown {
    try {
      const item = localStorage.getItem(key);
      // return item;
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get ${key} from local storage`, error);
      return null;
    }
  }

  set(data: unknown, key: string = 'accessToken') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key} to local storage`, error);
    }
  }

  clear(key: string = 'accessToken') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remover ${key} from local storage`);
    }
  }
}
