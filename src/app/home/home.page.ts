import { Component } from '@angular/core';
import { ApiProductosService } from './../servicio/api-productos.service';
import { RespuestaApi } from './../interfaces/RespuestaApi';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter, ViewWillLeave {

  private suscripcionProducto!: Subscription;
  public datos!: RespuestaApi;

  constructor(
    public producto: ApiProductosService
  ) {
    
  }

  ionViewWillEnter(): void {
    // Inicia la animación de entrada
    this.suscripcionProducto = this.producto.productos.subscribe(losDatos => {
      if(losDatos){
        this.datos = losDatos;
      }
    });
    this.producto.obtenerProductos();
  }

  ionViewWillLeave(): void {
    // Inicia la animación de salida
    this.suscripcionProducto.unsubscribe();
  }

  

}
