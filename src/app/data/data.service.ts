import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual' , 'lituation']);
  }


  postUserSettingsForm(userSettings: UserSettings) : Observable<any> {
    
    return this.http.post('https://putsreq.com/2II2hxFpcU0JhKBL7qka', userSettings);

    //return of(userSettings);
  }
}
