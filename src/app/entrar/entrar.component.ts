import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UsuarioLoginDTO = new UsuarioLoginDTO()

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(){
    window.scroll(0,0)
  }
  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UsuarioLoginDTO) => {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.email = this.userLogin.email
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.idUsuario
      console.log('Aqui funfa')

      this.router.navigate(['/inicio'])

    }, erro=>{
      if(erro.status == 400){
        alert('Usuário ou senha está incorreta!')
      }
    });
  }
}
