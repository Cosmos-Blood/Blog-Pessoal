import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin: UsuarioLoginDTO): Observable<UsuarioLoginDTO>{
    return this.http.put<UsuarioLoginDTO>('https://bloguinh0pessoal.herokuapp.com/usuario/credenciais', usuarioLogin)
  }
  cadastrar(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('https://bloguinh0pessoal.herokuapp.com/usuario/criar', usuario)
  }
}
