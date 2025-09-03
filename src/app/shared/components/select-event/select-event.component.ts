import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { CardItemEventComponent } from '../card-item-event/card-item-event.component';
import { EventData } from '@app/features/eventos/interfaces/eventData.interface';
import { EventosService } from '@app/features/eventos/services/eventos.service';



@Component({
  selector: 'app-select-event',
  imports: [CardItemEventComponent],
  templateUrl: './select-event.component.html',
  styleUrl: './select-event.component.css'
})
export class SelectEventComponent implements OnInit {
  private eventosService = inject(EventosService);
  // Lista de eventos (puedes obtenerla de una API en un futuro)
  eventos!: EventData[];
  SelectedEvent = output<string>();

  // Variables para manejar el pop-up
  eventoSeleccionado: EventData| null = null;
  mostrarPopup = input<boolean>(true);
  closePopup = output<void>();

  ngOnInit(): void {
    //Inicializamos la lista de eventos al cargar el componente
    this.eventos = this.eventosService.getEventosActivos();

  }

 
  seleccionarEvento(evento: EventData): void {
    // 1. Asignamos el evento clickeado para mostrarlo en el pop-up
    this.eventoSeleccionado = evento;
    // 2. Mostramos en consola el evento elegido (como un objeto)
    console.log('Evento seleccionado:', this.eventoSeleccionado);
    // 3. Guardamos en localStorage el evento seleccionado
    // Usamos JSON.stringify para convertir el objeto a un string
    try {
      localStorage.setItem('eventoSeleccionado', JSON.stringify(this.eventoSeleccionado));
      this.SelectedEvent.emit(evento.id);
      this.cerrarPopup();
      console.log('Evento guardado en localStorage correctamente.');
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }
  }

  cerrarPopup(): void {
    // this.eventoSeleccionado = null; // Limpiamos la selección
    this.closePopup.emit(); // Emitimos el evento para cerrar el pop-up
  }

}
