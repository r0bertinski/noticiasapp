import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const apiVersion = environment.apiVersion;

// CORS error.
const httpOptions = {
  headers: new HttpHeaders({
    'X-Api-key': apiKey,
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  private ejecturaQuery<T>( query: string) {
    query = `${apiUrl}/${apiVersion}${query}&apiKey=${apiKey}`;
    return this.http.get<T>( query );

  }

  getTopHeadLines() {
    return this.ejecturaQuery<RespuestaTopHeadLines>(`/top-headlines?country=us`);
  }

  // business entertainment general health science sports technology
  getTopHeadlinesCategory( categoria: string ) {
    return this.ejecturaQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}`);

  }
}
