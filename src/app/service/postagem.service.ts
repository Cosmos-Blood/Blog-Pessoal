import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PostagemModel } from '../model/PostagemModel';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }
  getAllPostagens(): Observable<PostagemModel[]>{
    return this.http.get<PostagemModel[]>('https://bloguinh0pessoal.herokuapp.com/postagens/lista', this.token)
  }
  getByIdPostagem(idPostagem: number): Observable<PostagemModel>{
    return this.http.get<PostagemModel>(`https://bloguinh0pessoal.herokuapp.com/postagens/pesquisar/id/${idPostagem}`, this.token)
  }
  postPostagem(postagem: PostagemModel): Observable<PostagemModel>{
    return this.http.post<PostagemModel>('https://bloguinh0pessoal.herokuapp.com/postagens/publicar', postagem, this.token)
  }
  putPostagem(postagem: PostagemModel): Observable<PostagemModel>{
    return this.http.put<PostagemModel>('https://bloguinh0pessoal.herokuapp.com/postagens/atualizar', postagem, this.token)
  }
  deletePostagem(idPostagem: number){
    return this.http.delete(`https://bloguinh0pessoal.herokuapp.com/postagens/deletar/${idPostagem}`, this.token)
  }
}

