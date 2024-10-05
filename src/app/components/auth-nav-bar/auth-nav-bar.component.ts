import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MytranslationService } from '../../services/mytranslation.service';



@Component({
  selector: 'app-auth-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './auth-nav-bar.component.html',
  styleUrl: './auth-nav-bar.component.scss'
})
export class AuthNavBarComponent {

}
