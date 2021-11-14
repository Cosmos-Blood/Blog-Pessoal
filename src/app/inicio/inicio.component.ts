import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';
import { TemaModel } from '../model/TemaModel';
import { UsuarioModel } from '../model/UsuarioModel';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()
  listaPostagem: PostagemModel[]
  
  listaTema: TemaModel[]
  temaId: number
  tema: TemaModel = new TemaModel()

  user: UsuarioModel = new UsuarioModel()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    
    if(environment.token == ''){
      alert('Sua sessão foi encerrada, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()
    this.postagemService.refreshToken()
    this.auth.refreshToken()

    this.getAllTemas()
    this.getAllPostagens()
  }
getAllTemas(){
  this.temaService.getAllTema().subscribe((resp: TemaModel[]) => {
    this.listaTema = resp
  })
}
findByIdTema(){
  this.temaService.getByIdTema(this.temaId).subscribe((resp: TemaModel) =>{
    this.tema = resp
  })
}

getAllPostagens(){
  this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[]) => {
    this.listaPostagem = resp
  })
}

  publicar(){
    this.tema.idTema = this.temaId
    this.postagem.temaRelacionado = this.tema

    this.user.idUsuario = this.idUser
    this.postagem.usuarioCriador = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel) => {
      this.postagem = resp
      alert('Postagem criada!')
      this.postagem = new PostagemModel()
      this.getAllPostagens()
    })
  }


  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: UsuarioModel) => {
      this.user = resp
    })
  }
}
