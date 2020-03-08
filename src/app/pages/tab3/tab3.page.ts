import { Component } from '@angular/core';
import { DataLocalServiceService } from '../../servicios/data-local-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }
  // lo ponemos como public para poder acceder desde el Html.
  constructor( public datalocalService: DataLocalServiceService ) { }

  // this.favoritos = this.datalocalService.cargarFavoritos();

}
