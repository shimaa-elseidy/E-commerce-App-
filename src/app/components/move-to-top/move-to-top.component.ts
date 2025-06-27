import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-move-to-top',
  standalone: true,
  imports: [NgIf],
  template: `
    <button 
      *ngIf="showButton" 
      (click)="scrollToTop()" 
      class="move-to-top-btn"
      style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; background-color: #EF1603; color: white; border: none; border-radius: 50%; width: 50px; height: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); cursor: pointer; transition: all 0.3s ease;">
      <i class="fas fa-arrow-up"></i>
    </button>
  `
})
export class MoveToTopComponent {
  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}