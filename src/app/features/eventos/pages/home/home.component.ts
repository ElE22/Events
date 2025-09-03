import { Component, inject, OnInit, output, signal } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { EventListComponent } from "../../components/event-list/event-list.component";
import { SelectEventComponent } from "@app/shared/components/select-event/select-event.component";

import { Evento } from '../../interfaces/event.interface';
import { EventData } from '../../interfaces/eventData.interface';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-home',
  imports: [EventListComponent, SelectEventComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  // Servicio de eventos
  private eventosService = inject(EventosService);

  // Texto del título
  titulo: string = "¿Cómo te sientes hoy?";

  // Mensaje de feedback
  feedback = signal<string>('Enviado con éxito.');

  // Control de visibilidad de mensaje
  showMsg = signal<boolean>(false);

  // Control de visibilidad del modal
  modalVisible = signal<boolean>(false);

  // Opciones del evento
  eventoSelected= signal<EventData | null>(null);

  // Evento para abrir menú
  abrirMenu = output<void>();

  // Al iniciar valida si hay evento en localStorage
  ngOnInit() {
    const eventoLocal = this.getFromLocalStorage();
    const eventoEncontrado = this.getEventosActivos()
      .find(evento => evento.id === (eventoLocal as EventData)?.id);

    if (eventoLocal && eventoEncontrado) {
      this.eventoSelected.set(eventoEncontrado);
    } else {
      this.modalVisible.set(true);
    }
  }

  // Muestra mensaje de feedback temporal
  showFeedback(event: boolean) {
    this.showMsg.set(event);
    setTimeout(() => this.showMsg.set(false), 1000);
  }

  // Retorna eventos activos
  getEventosActivos() {
    return this.eventosService.getEventosActivos();
  }

  // Emite evento para abrir menú
  abrirMenuEvent() {
    this.abrirMenu.emit();
  }

  // Obtiene evento guardado en localStorage
  getFromLocalStorage(): EventData | false {
    const data = localStorage.getItem('eventoSeleccionado');
    if (!data) return false;
    return JSON.parse(data) as EventData;
  }

  //handle evento seleccionado
  handleEventoSeleccionado(event: string) {
    const evento = this.getEventosActivos().find(ev => ev.id === event) || null;
    this.eventoSelected.set(evento);
  }

  // Cierra el modal de selección de evento
  closeModal() {
    this.modalVisible.set(false);
  }
  // Abre el modal de selección de evento
  openModal() {
    this.modalVisible.set(true);
  }
}
