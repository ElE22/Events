import { Component, input } from '@angular/core';
import { EventCardListItemComponent } from "./event-card-list-item/event-card-list-item.component";
import { Eventos } from '../../interfaces/event.interface';



@Component({
  selector: 'app-event-card-list',
  imports: [EventCardListItemComponent],
  templateUrl: './event-card-list.component.html',
  styleUrl: './event-card-list.component.css'
})
export class EventCardListComponent {
 eventos = input<Eventos[]>();
}
