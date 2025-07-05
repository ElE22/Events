import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-event-list-item',
  imports: [],
  templateUrl: './event-list-item.component.html',
  styleUrl: './event-list-item.component.css',

})
export class EventListItemComponent {
 icono= input.required<string>();
 descripcion = input.required<string>();
}
