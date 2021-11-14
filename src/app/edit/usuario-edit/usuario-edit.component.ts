import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/UsuarioModel';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel()
  idUsuario: number
  confirmarSenha: string
  tipoDeUsuario: string

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua sessão foi encerrada, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
    this.auth.refreshToken()

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmeSenha(event: any){
    this.confirmarSenha = event.target.value
  }
  tipoUsuario(event: any){
    this.tipoDeUsuario = event.target.value
  }
  atualizar(){
    console.log(this.usuario)
    this.usuario.tipo = this.tipoDeUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert("As senhas não estão parelhas!")
    } else {
      this.auth.cadastrar(this.usuario).subscribe((resp: UsuarioModel) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuário atualizado com sucesso! Faça o login novamente.')
          environment.foto = ''
          environment.nome = ''
          environment.id = 0
          environment.token = ''
      })
    }
  }
  
  findByIdUsuario(id: number){
    this.auth.getByIdUser(id).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
    })
  }
}
