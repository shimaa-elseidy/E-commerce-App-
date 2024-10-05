import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { MytranslationService } from '../../services/mytranslation.service';
import { CartService } from '../../core/services/cart.service';
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
  readonly _TranslateService = inject(TranslateService);

  count:Signal<number> = computed(()=> this._CartService.cartCount())

  changeLanguage(lang:string):void{

    this._MytranslationService.changeLang(lang)

  }

  ngOnInit(): void {
      this._CartService.getProductCart().subscribe(
        {
          next:(res)=>{console.log('cartNumber:',res);
            this._CartService.cartCount.set(res.numOfCartItems //!
            )

          }
        }
      )//*awl maft7 elly hayzhr 

  }

  private readonly _Router = inject(Router)
logout():void
{
  localStorage.removeItem('userToken');
  this._Router.navigate(['/login'])
}
}
