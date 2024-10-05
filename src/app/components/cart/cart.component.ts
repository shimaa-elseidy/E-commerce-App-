import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Icart } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy {
  private readonly _CartService=inject(CartService);
  cartList:Icart={} as Icart;

  cartsub!:Subscription;
  deletesub!:Subscription;
  updatesub!:Subscription;
  clearsub!:Subscription;

ngOnInit(): void {
    this.cartsub= this._CartService.getProductCart().subscribe({
      next:(res)=>{ 
        this.cartList=res.data // {totalCartPrice: ,products:[{}]} //!ana ena 3awza el []of products;
        console.log(this.cartList);
        
      }
    })
}

delete(id:string):void
{
  this.deletesub=this._CartService.deleteItm(id).subscribe(
    {
      next:(res)=>{
        this.cartList=res.data 
        
        //! important (delete function btrg3 nfs el {} elly rag3 fe ngoninit(),
        //!lazm a3ml kda 34an el html y7s l2n law m3mlt4 kda el backend bs elly hyb2a hass bl changes)
        this._CartService.cartCount.set(res.numOfCartItems)
        }
    }
  )
}
update(id:string,count:number):void
{
if (count>0) {  //! 3shan lma yosel 0 may3ml4 haga
  this.updatesub=this._CartService.updateProduct(id,count).subscribe(
    {
      next:(res)=>{
        console.log(res);
        this.cartList=res.data
      
      }
    }
  )
}
}




clearCart(): void {
  // عرض رسالة تأكيد قبل الحذف
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to clear the cart? This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0aad0a',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, clear it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // إذا أكد المستخدم الحذف
      this.deletesub = this._CartService.clearCart().subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this.cartList = {} as Icart;

            // عرض رسالة التنبيه بنجاح الحذف
            Swal.fire({
              title: 'Cart cleared successfully!',
              text: 'All items have been removed from your cart.',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor:'#0aad0a'
            });
            this._CartService.cartCount.set(0)
          }
        },
        error: (err) => {
          console.log(err);
          // عرض رسالة خطأ في حالة فشل الحذف
          Swal.fire({
            title: 'Error!',
            text: 'Failed to clear the cart. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  });
}



ngOnDestroy(): void {
    this.cartsub?.unsubscribe();
    this.deletesub?.unsubscribe();
    this.updatesub?.unsubscribe();
    this.clearsub?.unsubscribe();
}

}
