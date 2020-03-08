import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalServiceService {

  noticias: Article[] = [];
  constructor( private storage: Storage,
               public toastCtrl: ToastController ) {
    this.cargarFavoritos();
   }

   async presentToast( message ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();

  }

  guardarNoticia( noticia: Article ) {

    // Nota, sintaxys EMS6, es como hacer noti(){ return noti.title === noticia.title; }
    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ){
      this.noticias.unshift( noticia ); // la colocamos al principio del array.
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Your favorite has been added.');
    }

  }

  async cargarFavoritos() {
    
  // Await va a esperar al resultado y lo va a imprimir aqui
   const favoritos = await this.storage.get('favoritos');
   if ( favoritos ){
    this.noticias = favoritos;
   }

 
  }

  borrarNoticia( noticia: Article ){
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Your favorite has been removed.');

  }

  
}
