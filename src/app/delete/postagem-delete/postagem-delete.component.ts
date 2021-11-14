import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemModel } from 'src/app/model/PostagemModel';
import { TemaModel } from 'src/app/model/TemaModel';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    
    if(environment.token == ''){
      alert('Sua sessão foi encerrada, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
    this.postagemService.refreshToken()

    this.idPost = this.route.snapshot.params['idPostagem']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel) =>{
      this.postagem = resp
    })
  }
  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      alert('Postagem deletada!')
      this.router.navigate(['/inicio'])
    })
  }

}
