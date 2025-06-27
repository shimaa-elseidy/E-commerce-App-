import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { BlankNavBarComponent } from "../../components/blank-nav-bar/blank-nav-bar.component";
import { MoveToTopComponent } from "../../components/move-to-top/move-to-top.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, BlankNavBarComponent, MoveToTopComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
