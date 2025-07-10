import { Component, ElementRef, HostListener, inject,  signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SideMenuService } from '../../services/side-menu.service';
import { NgClass } from '@angular/common';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
}
@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive, NgClass, ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  private el = inject(ElementRef);
  menuService = inject(SideMenuService)

  @HostListener('document:click', ['$event.target'])
  handleClick(target: HTMLElement) {
    const clickedInside = this.el.nativeElement.contains(target);
    const clickedButton = target.closest('.open-sidebar');

    if (!clickedInside && !clickedButton) {
      this.menuService.close();
    }
  }

  menuOptions = signal<MenuOption[]>([
    {icon:'', label: 'Home', route: '/home'},
    {icon: 'fas fa-calendar-alt', label: 'Manejo de eventos',  route: '/events'},
    {icon: 'fas fa-chart-bar', label: 'Reportes',  route: '/reportes'}
  ]);
}
