import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../servicios/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  // noticias: Article[] = [];
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  currentCategory = '';

  constructor( private noticiasService: NoticiasService) {}
 
  ngOnInit() {
    this.segment.value = this.categorias[1];  // Establemcemos un segment por defecto.
    this.cargarNoticias( this.segment.value );

    }

    changeCategory( event ){

      // reseteamos el array de noticias.
      this.noticias = [];
      console.log('categoria', event.detail.value );
      this.cargarNoticias( event.detail.value );
    }

    cargarNoticias( categoria: string ){
      this.noticiasService.getTopHeadlinesCategory( categoria )
          .subscribe( resp => {   
            console.log('noticias status', resp.status);
            // el operador spread lo usamos para agregar al array cada noticia de forma individual.
            this.noticias.push( ...resp.articles);
          });
    }

}
