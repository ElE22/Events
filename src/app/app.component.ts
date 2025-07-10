import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "./features/eventos/components/side-menu/side-menu.component";
import { SideMenuService } from './features/eventos/services/side-menu.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
isOpenedService = inject(SideMenuService);
  title = 'MDTEvents';

  // manejarSideMenu(){
  //   this.isOpenedService.toggle()
  // }

  
}
