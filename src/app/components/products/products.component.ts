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
  isLoading:boolean = true;
  isAddingToCart:boolean = false;
  
  Math = Math;
  
  private readonly _HomeServiceService = inject(HomeServiceService);
  private readonly _CartService =inject(CartService);
  private readonly _ToastrService = inject(ToastrService);


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.allproductSub = this._HomeServiceService.getAllProducts().subscribe({  
      next: (res) => {  
        this.productList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
        this._ToastrService.error('Failed to load products. Please try again.', 'Error');
      }
    });
  }

  addToCart(id: any): void {
    if (typeof window !== 'undefined' && !localStorage.getItem('userToken')) {
      this._ToastrService.info('Please login to add items to cart', 'Login Required', {
        positionClass: 'toast-top-right',
        timeOut: 3000
      });
      return;
    }
    
    if (this.isAddingToCart) return;
    
    this.isAddingToCart = true;
    this.addToCartSub = this._CartService.addPropductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCount.set(res.numOfCartItems);
        this._ToastrService.success('Product added successfully to your cart! 🛒', 'Success', {
          positionClass: 'toast-top-right',
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
        this.isAddingToCart = false;
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        this._ToastrService.error('Failed to add product to cart. Please try again.', 'Error', {
          positionClass: 'toast-top-right',
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
        this.isAddingToCart = false;
      }
    });
  }


  ngOnDestroy(): void {
      this.allproductSub?.unsubscribe();
      this.addToCartSub?.unsubscribe();
  }
  }


