import { HomeServiceService } from '../../core/services/home-service.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe,RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit , OnDestroy{
private readonly _ActivatedRoute = inject(ActivatedRoute);//activatedRoute has information about current routing
private readonly _HomeServiceService = inject(HomeServiceService);
private readonly _CartService =inject(CartService);
private readonly _ToastrService = inject(ToastrService);



productId!:string|null;
productIdSub!:Subscription;


specificProduct:Iproduct|null=null;//34an ha3ml fe html condition 3shan at2kd en data gt we b3deen yt3mlha display fe html
// specificProduct:Iproduct={} as Iproduct; //!important---------------------

ngOnInit(): void { //!important.
  // this.productSub = this._ActivatedRoute.paramMap.subscribe(  //el paramMap bt return observable so we 'd do subscribe
  //   {
  //     next:(p)=>
  //       {
  //         this.productId = p.get('id');
  //       this.productIdSub=this._HomeServiceService.getSpecificProduct(this.productId).subscribe({
  //         next:(res)=>{
  //           this.specificProduct=res.data;

  //         },
  //         error:(err)=>{console.log(err);
  //         }
  //       })
  //       }
  //   }
    
  // )
//!resolve===============================
  this._ActivatedRoute.data.subscribe( //!data property has info about current routing.
    {
      next:(res)=>{
        this.specificProduct=res['details']['data']
      },
      error:(err)=>{console.log(err);
      }
      
    }
  )
}

addToCart(id:any):void
{
  this.productIdSub=this._CartService.addPropductToCart(id).subscribe({
    next:(res)=>{console.log(res);
      this._ToastrService.success('Product added successfully to your cart', 'Success', {
        positionClass: 'toast-top-center',
        timeOut:3000,
    })},
    error:(err)=>{console.log(err);
      this._ToastrService.error('Failed to add product to cart.', 'Error');
    },
  })
}




ngOnDestroy(): void {
    // this.productSub?.unsubscribe();
    this.productIdSub?.unsubscribe();
}

}

