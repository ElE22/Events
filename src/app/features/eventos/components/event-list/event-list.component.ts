import { Component, input, output } from '@angular/core';
import { Evento } from '../../interfaces/event.interface';
import { EventCardListItemComponent } from '../event-card-list/event-card-list-item/event-card-list-item.component';

@Component({
  selector: 'app-event-list',
  imports: [EventCardListItemComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  items = input.required<Evento[]>();

  onMensaje = output<Boolean>();

  showFeedback():void {
    this.onMensaje.emit(true);
  }

}
