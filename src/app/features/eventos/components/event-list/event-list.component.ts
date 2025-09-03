import { Component, input, output } from '@angular/core';
import { Evento } from '../../interfaces/event.interface';
import { EventCardListItemComponent } from '../event-card-list/event-card-list-item/event-card-list-item.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports: [],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  items = input.required<[string, string?][]>();
  onMensaje = output<boolean>();

  showFeedback():void {
    this.onMensaje.emit(true);
  }

}
