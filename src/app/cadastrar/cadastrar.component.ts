import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../model/UsuarioModel';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel()
  confirmarSenha: string
  tipoDeUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }
  confirmeSenha(event: any){
    this.confirmarSenha = event.target.value
  }
  tipoUsuario(event: any){
    this.tipoDeUsuario = event.target.value
  }
  cadastrar(){
    this.usuario.tipo = this.tipoDeUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert("As senhas não estão parelhas!")
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: UsuarioModel) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }
}
