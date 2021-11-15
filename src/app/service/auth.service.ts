import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(usuarioLogin: UsuarioLoginDTO): Observable<UsuarioLoginDTO>{
    return this.http.put<UsuarioLoginDTO>('https://bloguinh0pessoal.herokuapp.com/usuario/credenciais', usuarioLogin)
  }
  cadastrar(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('https://bloguinh0pessoal.herokuapp.com/usuario/criar', usuario)
  }
  atualizar(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.http.put<UsuarioModel>('https://bloguinh0pessoal.herokuapp.com/usuario/atualizar', usuario, this.token)
  }
  logado(){
    let ok: boolean = false;

    if(environment.token != ""){
      ok = true;
    }
      return ok
  }

  getByIdUser(id: number): Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`https://bloguinh0pessoal.herokuapp.com/usuario/pesquisar/id/${id}`, this.token)
  }
  
}
