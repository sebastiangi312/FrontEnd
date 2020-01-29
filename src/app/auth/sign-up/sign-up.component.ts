import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, CheckboxRequiredValidator } from '@angular/forms';

interface Usuario{
  nombre: string;
  correo: string;
  password: string;
  id: number;
  celular: number;
  dineroDisponible: number;
  fechaNacimiento: Date;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formularioCreado: FormGroup;
  usuarios: Array<Usuario> = new Array<Usuario>()
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioCreado = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      id: ['', Validators.required],
      celular: ['', Validators.required],
      dineroDisponible: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      restriccion: ['', Validators.required]
    })
  }

  aceptar(){
    this.usuarios.push(this.formularioCreado.value as Usuario)
    this.formularioCreado.reset()
  }

}
