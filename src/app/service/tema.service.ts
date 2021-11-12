import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllTema(): Observable<TemaModel[]>{
    return this.http.get<TemaModel[]>('https://bloguinh0pessoal.herokuapp.com/tema/todos', this.token)
  }
  getByIdTema(idTema: number): Observable<TemaModel>{
    return this.http.get<TemaModel>(`https://bloguinh0pessoal.herokuapp.com/tema/encontrar/${idTema}`, this.token)
  }
  postTema(tema: TemaModel): Observable<TemaModel>{
    return this.http.post<TemaModel>('https://bloguinh0pessoal.herokuapp.com/tema/salvar', tema, this.token)
  }
  putTema(tema: TemaModel): Observable<TemaModel>{
    return this.http.put<TemaModel>('https://bloguinh0pessoal.herokuapp.com/tema/atualizar', tema, this.token)
  }
  deleteTema(idTema: number){
    return this.http.delete(`https://bloguinh0pessoal.herokuapp.com/tema/deletar/${idTema}`, this.token)
  }
}
