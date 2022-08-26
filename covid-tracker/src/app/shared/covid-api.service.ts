import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryData } from './models/covid-data.model';

@Injectable({
  providedIn: 'root',
})
export class CovidApiService {
  private BASE_URL = 'https://covid-193.p.rapidapi.com';
  private cache$: Observable<CountryData> | undefined;

  constructor(protected http: HttpClient) {}

  public getAllCountryData(): Observable<CountryData> {
    if (!this.cache$) {
		// caching data for the first time
      	this.cache$ = this.http.get<CountryData>(`${this.BASE_URL}/countries`)
    }
    return this.cache$;
  }

  public getCountryData(country: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/statistics?country=${country}`);
  }

  public getStatictics(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/statistics?country=All`);
  }

  public getHistory(country: string, day: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/history?country=${country}&day=${day}`
    );
  }
}
