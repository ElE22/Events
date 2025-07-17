import { Component, computed, signal } from '@angular/core';
import EventDetailComponent from '@app/features/eventos/pages/event-detail/event-detail.component';

@Component({
  selector: 'app-event-card-list-item',
  imports: [EventDetailComponent],
  templateUrl: './event-card-list-item.component.html',
  styleUrl: './event-card-list-item.component.css'
})
export class EventCardListItemComponent {
private eventDetailModal = signal<boolean>(false);
isOpenedDetailModal = computed(() => this.eventDetailModal());

openEventDetailModal() {
  this.eventDetailModal.set(true);

}

closeEventDetailModal() {
  this.eventDetailModal.set(false); 
}
}
