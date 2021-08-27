import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuariodetalle',
  templateUrl: './usuariodetalle.component.html',
  styleUrls: ['./usuariodetalle.component.css']
})
export class UsuariodetalleComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params =>{
      let id = params.get('id');
      this.getUsuario(+id);
    })

  }

  getUsuario(id: number) {
    this.usuarioService.getUsuario(id).subscribe(
      response => {
        this.usuario = response
      }
    )
  }

}
