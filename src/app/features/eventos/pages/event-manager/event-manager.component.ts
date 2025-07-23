import { Component, computed, signal } from '@angular/core';
import { EventCardListComponent } from "../../components/event-card-list/event-card-list.component";
import { Eventos } from '../../interfaces/event.interface';
import { AddEventModalComponent } from "../../components/add-event-modal/add-event-modal.component";


@Component({
  selector: 'app-event-manager',
  imports: [EventCardListComponent, AddEventModalComponent],
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.css'
})
export default class EventManagerComponent {

  private isModalOpen = signal<Boolean>(false);
  isModal = computed(()=> this.isModalOpen());
  openModal(){
    this.isModalOpen.set(true);
  }

  closeModal(){
    this.isModalOpen.set(false);
  }
}
