import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

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




  constructor() { }

  ngOnInit() {
  }

}
