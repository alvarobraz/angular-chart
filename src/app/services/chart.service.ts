import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'x-access-token': `${environment.API_KEY}`,
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private baseUrl = environment.baseUrl;
  // private proxyUrl = environment.proxyUrl;

  constructor(private http: HttpClient) {}

  cryptoData() {
    const url = `${this.baseUrl}`;
    return this.http.get(url, httpOptions);
  }
}
