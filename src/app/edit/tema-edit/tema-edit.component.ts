import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaModel } from 'src/app/model/TemaModel';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: TemaModel = new TemaModel()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()

    let id = this.route.snapshot.params['idTema']
    this.findByIdTema(id)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: TemaModel) => {
      this.tema = resp
    })
  }
  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: TemaModel) => {
      this.tema = resp
      alert('Tema atualizado!')
      this.router.navigate(['/tema'])
    })
  }
}
