import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { Plugins } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  
  @Input() noticia: Article;
  @Input() indice: number;


  // console.log('shareRet', shareRet);
  constructor( private socialSharing: SocialSharing, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}

  abrirNoticia() {
    const { Browser } = Plugins;
    Browser.open({ url: this.noticia.url });
    console.log(this.noticia.url);
  }

  async lanzarMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked'),
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            )
          }
        },
        {
          text: 'Favorito',
          icon: 'star',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favorite clicked')
          }

        },
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
}
