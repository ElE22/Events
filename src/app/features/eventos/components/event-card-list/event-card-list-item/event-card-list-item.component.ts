import { NgClass } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { actualizarEstado, EventData } from '@app/features/eventos/interfaces/eventData.interface';
import EventDetailComponent from '@app/features/eventos/pages/event-detail/event-detail.component';
import { TuncatePipePipe } from '@app/shared/pipes/tuncate-pipe.pipe';

@Component({
  selector: 'app-event-card-list-item',
  imports: [EventDetailComponent, NgClass, TuncatePipePipe],
  templateUrl: './event-card-list-item.component.html',
  styleUrl: './event-card-list-item.component.css'
})
export class EventCardListItemComponent {
  private eventDetailModal = signal<boolean>(false);
  isOpenedDetailModal = computed(() => this.eventDetailModal());
  infoEvent = input<EventData>()

  
  actualizarEstadoEvento = output<actualizarEstado>()

  openEventDetailModal() {
    this.eventDetailModal.set(true);

  }

  closeEventDetailModal() {
    this.eventDetailModal.set(false);
  }



}
