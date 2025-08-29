import { Component, computed, inject, input, signal } from '@angular/core';
import { EventCardListItemComponent } from "./event-card-list-item/event-card-list-item.component";
import { Eventos } from '../../interfaces/event.interface';
import { actualizarEstado, EventData } from '../../interfaces/eventData.interface';
import { EventosService } from '@features/eventos/services/eventos.service';



@Component({
  selector: 'app-event-card-list',
  imports: [EventCardListItemComponent],
  templateUrl: './event-card-list.component.html',
  styleUrl: './event-card-list.component.css'
})
export class EventCardListComponent {
 //eventos = input<Eventos[]>();
 eventoService = inject(EventosService)

eventos = computed(() => this.eventoService.getEventos());
// eventos = signal(this.eventoService.getEventos())

}
