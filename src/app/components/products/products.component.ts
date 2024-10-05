import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { HomeServiceService } from '../../core/services/home-service.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipePipe } from '../../core/pipes/search-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,SearchPipePipe,FormsModule,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy {


  productList:Iproduct[]=[];
  allproductSub!:Subscription;
  addToCartSub!:Subscription;
  text:string='';
  
  private readonly _HomeServiceService = inject(HomeServiceService);
  private readonly _CartService =inject(CartService);
  private readonly _ToastrService = inject(ToastrService);


  ngOnInit(): void {
    this.allproductSub = this._HomeServiceService.getAllProducts().subscribe({  
      next: (res) => {  
          this.productList = res.data; 
      }  
  });
  }

  addToCart(id:any):void
  {
    this.addToCartSub=this._CartService.addPropductToCart(id).subscribe({
      next:(res)=>{console.log(res);
        this._ToastrService.success('Product added successfully to your cart', 'Success', {
          positionClass: 'toast-top-center',
          timeOut:3000,
      })},
      error:()=>{
        this._ToastrService.error('Failed to add product to cart.', 'Error');
      },
    })
  }


  ngOnDestroy(): void {
      this.allproductSub?.unsubscribe();
      this.addToCartSub?.unsubscribe();
  }
  }


