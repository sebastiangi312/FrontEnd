import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { FormGroup, Validators , FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  formularioCreado: FormGroup;


  usuario: Usuario = {

    id: 0,
    nombre: '',
    password: '',
    email: '',
    fecha_de_nacimiento: '',
    celular: 0,
    dinero_disponible: 0,
    rol: '',
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioCreado = this.formBuilder.group({

      correo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],

      celular: ['', Validators.required],

      restriccion: ['', Validators.required]
    })
  }

}
