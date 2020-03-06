import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../servicios/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  // noticias: Article[] = [];
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService) {}
  ngOnInit() {
    this.segment.value = this.categorias[1];  // Establemcemos un segment por defecto.
    this.getNews( this.segment.value );

    }

    loadData( event ) {
      this.getNews(this.segment.value, event);
    }

    changeCategory( event ){

      // reseteamos el array de noticias.
      this.noticias = [];
      this.getNews( event.detail.value );
    }

    getNews( category, event? ) {
      this.noticiasService.getTopHeadlinesCategory(category)
          .subscribe( resp => {
            console.log('noticias status', resp);
            // el operador spread lo usamos para agregar al array cada noticia de forma individual.
            if (resp.articles.length === 0) {
              event.target.complete();
              event.target.disabled = true;
              return;
            }
            this.noticias.push( ...resp.articles);

          });

      if ( event ) {
        event.target.complete();
      }

    }

}
