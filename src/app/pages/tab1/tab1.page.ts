import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../servicios/noticias.service';
import { Article } from '../../interfaces/interfaces';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() {
   this.getNews();
  }

  loadData( event ) {
    this.getNews( event );
  }

   getNews( event? ) {
      this.noticiasService.getTopHeadLines()
    .subscribe( resp => {
      console.log('noticias status', resp.status);
      if (resp.articles.length === 0) {
        event.target.complete();
        event.target.disabled = true;
        return;
      }

      this.noticias.push( ...resp.articles );
    });

      if (event) {
      console.log('event target', event.target);
      event.target.complete();
    }
  }
}
