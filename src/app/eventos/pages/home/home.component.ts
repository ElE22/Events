import { Component, output, signal } from '@angular/core';
import { EventListComponent } from "../../components/event-list/event-list.component";
import { Evento } from '../../interfaces/event.interface';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  titulo: string = "¿Cómo te sientes hoy?";
  feedback = signal<string>('Enviado con exito.');
  showMsg = signal<Boolean>(false);
  abrirMenu = output<void>();
  
  items = signal<Evento[]>([{icono: '😠', descripcion: 'muy mal'}, {icono: '😠', descripcion: 'Mal'},{icono: '😠', descripcion: 'regular'},{icono: '😠', descripcion: 'Bien'},{icono: '😠', descripcion: 'Excelente'}, ]);

  showFeedback(event: Boolean){
    this.showMsg.update(valor => valor = event);
    setTimeout(()=>{
      this.showMsg.update(valor => valor = false);
    }, 1000)
  }

  abrirMenuEvent(){
    this.abrirMenu.emit()
  }



 





}
