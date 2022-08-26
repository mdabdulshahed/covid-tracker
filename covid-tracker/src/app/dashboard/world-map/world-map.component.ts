import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesData } from 'countries-map';
import { Subject } from 'rxjs';
import { CovidApiService } from 'src/app/shared/covid-api.service';
import { takeUntil } from 'rxjs/operators';
import { CODES } from 'src/app/shared/country-codes';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit, OnDestroy {
  
  private unsubscriber$ = new Subject<void>();
  private countryCodes = [...CODES];
  public countryData: string[] | undefined;
  public mapDataReady = false;
  public selectedCountryData: { [key: string]: any } = {};
  public dataFetched = true;
  public mapData: CountriesData = {
    'IN': { 'value': 1000, 'extra': { 'name': 'INdia' } }
  };
  emptyResponse!: boolean;
  
  constructor(private covidApiService: CovidApiService) { }

  ngOnInit(): void {
    this.getAllCountryData();
  }

  getAllCountryData(): void {
    // this will return data from cache if its not a first call after loading whole website
    this.covidApiService.getAllCountryData().pipe(takeUntil(this.unsubscriber$))
        .subscribe(response => {
          if (response) {
            this.countryData = response.response;
            this.formatData()
          }
        });
  }

  getIndiCountryData(country: string): void {
    let name = this.getCountryName(country)
    if(name !== '') {
      this.covidApiService.getCountryData(name).pipe(takeUntil(this.unsubscriber$))
        .subscribe(response => {
          this.dataFetched = true
          if(response.response === []) {
            this.dataFetched = true
            this.emptyResponse = true
            return
          }
          if (response) {
            this.selectedCountryData = response.response[0]
            console.log(this.selectedCountryData['country'])
            this.emptyResponse = false
          }
          
        });
    } else{
      this.selectedCountryData = []
      this.dataFetched = true
      this.emptyResponse = true
    }
  }

  public formatData(): void {
    this.countryData?.forEach(country => {
      let code = this.getCountryCode(country)
      if(code !== '') this.mapData[code] = { 'value': 1000 }
    })
    this.mapDataReady = true
    console.log(this.mapData)
  }

  public getCountryCode(country: string): string {
    let code = this.countryCodes.find(item => {
      return item.name == country
    })?.code
    return code || ''
  }

  public getCountryName(country: string): string {
    let code = this.countryCodes.find(item => {
      return item.code == country
    })?.name
    return code || ''
  }

  select(data: any) {
    this.dataFetched = false
    this.getIndiCountryData(data.country)
  }

  ngOnDestroy(): void {
      this.unsubscriber$.unsubscribe();
  }

}
