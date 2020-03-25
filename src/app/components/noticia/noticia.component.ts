import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { Plugins } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalServiceService } from '../../servicios/data-local-service.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos = false;


  // console.log('shareRet', shareRet);
  constructor( 
    private socialSharing: SocialSharing,
    private actionSheetCtrl: ActionSheetController,
    private datalocalService: DataLocalServiceService,
    private platform: Platform) { }

  ngOnInit() {
    console.log('Favoritos', this.enFavoritos);
  }

  abrirNoticia() {
    const { Browser } = Plugins;
    Browser.open({ url: this.noticia.url });
    console.log(this.noticia.url);
  }

  async lanzarMenu() {

    let  guararBorrarBtn;

    if ( this.enFavoritos){
      // Borrar favoritos
      guararBorrarBtn = { text: 'Borrar Favorito',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Borrar de favoritos');
        this.datalocalService.borrarNoticia( this.noticia );
      }}
    } else {
      {
        guararBorrarBtn = { text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.datalocalService.guardarNoticia( this.noticia );
        }
      }
     }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.compartirNoticia();
          }
        },        
           guararBorrarBtn,        
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked')
          }
        }    
      ]
    });

    await actionSheet.present();
  }

  compartirNoticia() {
    if ( this.platform.is('cordova') ){
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if ( navigator['share'] ) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log('Sorry papi, but your browser does not support this feature');
      }
    }
  }
}
