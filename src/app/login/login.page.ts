import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../servicio/login.service';
// FormBuilder es el Servicio
// Validators grupo de funciones de validación.

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    public login: LoginService
  ) {
    // El login tiene 2 campos
    // usuario y contrasenia
    this.formulario = fb.group({
      // nombre_del_campo: ["valor", [validaciones sync], [validaciones async]]
      usuario: ["dontulio", [Validators.required], []],
      contrasenia: ["", [Validators.required, Validators.minLength(2)], []]
    });
  }

  public obtenerDatosFormulario(){
    const esValido = this.formulario.valid;
    if(!esValido){
      alert("Formulario es invalido :(");
      return
    }
    const usuario = this.formulario.getRawValue()?.usuario;
    const contrasenia = this.formulario.getRawValue()?.contrasenia;
    this.login.iniciarSesion(usuario, contrasenia);
    
    console.log("El formulario es valido: ", this.formulario.valid);
    console.log("Los datos son: ", this.formulario.getRawValue());
    console.log("Los errores son: ", this.formulario.errors);
    console.log(this.formulario.get("usuario")?.errors);
    console.log(this.formulario.get("contrasenia")?.errors);
  }

  ngOnInit() {
  }

}
