import { Injectable } from '@angular/core';
import { RespuestaApi } from './../interfaces/RespuestaApi';
// Yo uso el cliente
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, delay, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductosService {

  private $productos =  new BehaviorSubject<RespuestaApi | null>(null);
  public productos = this.$productos.asObservable();

  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  obtenerProductos(){
    this.$cargando.next(true);
    this.http.get<RespuestaApi>('https://dummyjson.com/products')
    .pipe(delay(2000))
    .subscribe(losDatos => {
      this.$productos.next(losDatos);
      this.$cargando.next(false);
      console.log("Los datos de la api SON");
      console.log(losDatos);
    })

  }

  
  obtenerProductosSiguiente30(){
    this.$cargando.next(true);
    this.http.get<RespuestaApi>('https://dummyjson.com/products?skip=30&limit=30')
    .pipe(delay(2000))
    .subscribe(losDatos => {
      this.$productos.next(losDatos);
      this.$cargando.next(false);
      console.log("Los datos de la api SON");
      console.log(losDatos);
    })

  }
}
