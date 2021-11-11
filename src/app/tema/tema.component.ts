import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from '../model/TemaModel';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: TemaModel = new TemaModel()
  listaTema: TemaModel[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      alert('Sua sessão foi encerrada, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()
    this.getAllTemas()
  }
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: TemaModel[]) => {
      this.listaTema = resp
    })
  }

  cadastrarTema(){
      this.temaService.postTema(this.tema).subscribe((resp: TemaModel) => {
        this.tema = resp
        alert('O tema foi cadastrado!')
        this.getAllTemas()
        this.tema = new TemaModel()
      })
  }
}
