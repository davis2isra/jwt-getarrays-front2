import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() id: number;
  @Input() nombre: string;
  @Output() notificar: EventEmitter<number> = new EventEmitter<number>();

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  borrarEmit() {
    console.log("En borrar Emit");
    console.log("El Id es: ", this.id);
    console.log("El nombre es: ", this.nombre);
    this.cerrarModal();

    this.notificar.emit(this.id);
  }

}
