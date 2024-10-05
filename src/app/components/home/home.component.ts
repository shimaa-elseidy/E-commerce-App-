import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeServiceService } from '../../core/services/home-service.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { SearchPipePipe } from '../../core/pipes/search-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,CurrencyPipe,SearchPipePipe,FormsModule,TranslateModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit ,OnDestroy{
private readonly _HomeServiceService = inject(HomeServiceService);
private readonly _CartService =inject(CartService);
private readonly _ToastrService = inject(ToastrService);

productList:WritableSignal<Iproduct[]> = signal([]);
categoriesList:WritableSignal<Icategory[]> = signal([]);
productSub!:Subscription;
categorySub!:Subscription;
addtocartSub!:Subscription;

text:WritableSignal<string> = signal('');


ngOnInit(): void {  
  this.productSub = this._HomeServiceService.getAllProducts().subscribe({  
      next: (res) => {  
          this.productList.set(res.data);
      }  
  });  

  this.categorySub=this._HomeServiceService.getAllCategories().subscribe({  
      next: (res) => {  
          this.categoriesList.set(res.data);  
      }  
  });  
}

customOptionsMainSlider: OwlOptions = {
  animateOut: 'fadeOut', 
  animateIn: 'fadeIn',   
  loop: true,
  rtl:true,//for slider 34an el translation
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 1000 ,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: false
}
customOptionsCategories: OwlOptions = {
  animateOut: 'fadeOut', // or slideOut
  animateIn: 'fadeIn',   // or slideIn
  loop: true,
  rtl:true,//for slider 34an el translation
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 500,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}

addToCart(id:any):void
{
  this.addtocartSub=this._CartService.addPropductToCart(id).subscribe({
    next:(res)=>{console.log(res);
      
      this._ToastrService.success('Product added successfully to your cart', 'Success', {
        positionClass: 'toast-top-start',
        timeOut:1000,
    })
    this._CartService.cartCount.set(res.numOfCartItems);
  },
    error:()=>{;
      this._ToastrService.error('Failed to add product to cart.', 'Error');
    },
  })
}




ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.categorySub?.unsubscribe();
    this.addtocartSub?.unsubscribe();
}



}
