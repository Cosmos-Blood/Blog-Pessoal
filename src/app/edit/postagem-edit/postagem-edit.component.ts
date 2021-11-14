import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemModel } from 'src/app/model/PostagemModel';
import { TemaModel } from 'src/app/model/TemaModel';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()

  tema: TemaModel = new TemaModel()
  listaTema: TemaModel[]
  idTema: number
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }


  ngOnInit(){
    window.scroll(0,0)
    
    if(environment.token == ''){
      alert('Sua sessão foi encerrada, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
    this.postagemService.refreshToken()
    this.temaService.refreshToken()

    let id = this.route.snapshot.params['idPostagem']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel) =>{
      this.postagem = resp
    })
  }
  atualizar(){
    this.tema.idTema = this.idTema
    this.postagem.temaRelacionado = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: PostagemModel) => {
      this.postagem = resp
      alert('Postagem atualizada!')
      this.router.navigate(['/inicio'])
    })
  }
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: TemaModel[]) => {
      this.listaTema = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel) => {
      this.tema = resp
    })
  }

}
