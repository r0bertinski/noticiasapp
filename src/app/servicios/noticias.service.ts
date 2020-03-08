import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const apiVersion = environment.apiVersion;

// CORS error.
// const httpOptions = {
//   headers: new HttpHeaders({
//     'X-Api-key': apiKey,
//     'Access-Control-Allow-Origin': '*'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  currentCategory = '';
  constructor( private http: HttpClient ) { }

  private ejecturaQuery<T>( query: string) {
    // query = `${apiUrl}/${apiVersion}${query}&apiKey=${apiKey}`;
    query = `${apiUrl}/${apiVersion}${query}&apiKey=${apiKey}`;
    // return this.http.get<T>( query,  httpOptions );
    return this.http.get<T>( query );


  }

  getTopHeadLines() {
    this.headLinesPage++;
    // return this.ejecturaQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
    return this.ejecturaQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);

  }

  // business entertainment general health science sports technology
  getTopHeadlinesCategory( categoria: string ) {
    if ( this.currentCategory  !== categoria ){
      this.currentCategory = categoria;
      this.headLinesPage = 0;
    } else {
      this.headLinesPage++;
    }
    console.log('headLinesPage', this.headLinesPage);
    return this.ejecturaQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.headLinesPage}`);

  }
}
