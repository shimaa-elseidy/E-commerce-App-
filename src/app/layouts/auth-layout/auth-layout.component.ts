import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavBarComponent } from "../../components/auth-nav-bar/auth-nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, AuthNavBarComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
