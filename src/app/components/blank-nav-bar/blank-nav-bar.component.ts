import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { MytranslationService } from '../../services/mytranslation.service';
import { CartService } from '../../core/services/cart.service';
import { PwaService } from '../../services/pwa.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-blank-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule,NgIf],
  templateUrl: './blank-nav-bar.component.html',
  styleUrl: './blank-nav-bar.component.scss'
})
export class BlankNavBarComponent implements OnInit {
  private readonly _MytranslationService = inject(MytranslationService);
  private readonly _CartService = inject(CartService);
  private readonly _PwaService = inject(PwaService);
  readonly _TranslateService = inject(TranslateService);

  count:Signal<number> = computed(()=> this._CartService.cartCount())
  canInstall = false;
  showPopup = false;

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('userToken');
    }
    return false;
  }

  changeLanguage(lang:string):void{
    this._MytranslationService.changeLang(lang)
  }

  ngOnInit(): void {
      if (this.isLoggedIn()) {
        this._CartService.getProductCart().subscribe(
          {
            next:(res)=>{console.log('cartNumber:',res);
              this._CartService.cartCount.set(res.numOfCartItems
              )
            },
            error:()=>{
              this._CartService.cartCount.set(0);
            }
          }
        )
      }
      
      // Check if PWA can be installed
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeinstallprompt', () => {
          this.canInstall = true;
        });
      }
  }
  
  installApp() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      this._PwaService.installApp();
    } else {
      // Fallback for browsers that don't support PWA
      window.open(window.location.origin, '_blank');
    }
    this.showPopup = false;
  }
  
  showInstallPopup() {
    this.showPopup = true;
  }
  
  closePopup() {
    this.showPopup = false;
  }

  private readonly _Router = inject(Router)
logout():void
{
  localStorage.removeItem('userToken');
  this._Router.navigate(['/login'])
}
}
