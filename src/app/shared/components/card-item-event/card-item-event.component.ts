import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { EventData } from '@app/features/eventos/interfaces/eventData.interface';
import { TuncatePipePipe } from '@app/shared/pipes/tuncate-pipe.pipe';

@Component({
  selector: 'app-card-item-event',
  imports: [TuncatePipePipe, NgClass],
  templateUrl: './card-item-event.component.html',
  styleUrl: './card-item-event.component.css'
})
export class CardItemEventComponent {
   infoEvent = input<EventData>()
}
