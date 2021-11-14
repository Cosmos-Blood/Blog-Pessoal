import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  nome = environment.nome
  foto = environment.foto
  idUsuario = environment.id
  
  ngOnInit(){
  }
sair(){
  this.router.navigate(['/entrar'])
  environment.foto = ''
  environment.nome = ''
  environment.id = 0
  environment.token = ''
}
}
