import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgIf,NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit,OnDestroy{
  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);//for current value info
  private readonly _OrdersService = inject(OrdersService);//for current value info

cartId:string | null ='';
ordersSub!:Subscription;

  ordersForm:FormGroup = this._FormBuilder.group({
    details:[null,[Validators.required,Validators.minLength(10)]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null,[Validators.required ]]
  }) 

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>
      {
        this.cartId = parms.get('id');
        console.log(this.cartId);
        
      },
    })
}


onSubmit():void
{
  if(this.ordersForm.valid)
  {
    console.log(this.ordersForm.value);
    this.ordersSub=this._OrdersService.checkout(this.cartId,this.ordersForm.value).subscribe
    (
      {
        next:(res)=>{console.log(res);
          if(res.status == 'success'){
            window.open(res.session.url ,'_self') //open in the same tap , _blank open in new tap
          }
        }
      }
    )
    
  }
}
ngOnDestroy(): void {
  this.ordersSub?.unsubscribe();
}
}
