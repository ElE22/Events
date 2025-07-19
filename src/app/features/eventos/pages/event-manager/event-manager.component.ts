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

  // eventos = signal<Eventos[]>( [{titulo: 'Innovación y Futuro Digital', descripcion: 'Un evento imperdible para profesionales y entusiastas de la tecnología...',
  //   fecha: '2025-10-15', location: '📍 Centro de Convenciones', status: '💚 Activo'
  //  }, {titulo: 'Innovación y Futuro Digitales', descripcion: 'Un evento imperdible para profesionales y entusiastas de la tecnología...',
  //   fecha: '2025-10-15', location: '📍 Centro de Convenciones', status: '💚 Activo'
  //  }])

}
