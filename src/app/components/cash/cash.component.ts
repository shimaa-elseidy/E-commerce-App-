import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IOrders } from '../../core/interfaces/iorders';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.scss'
})
export class CashComponent implements OnInit,OnDestroy {
private readonly _ActivatedRoute =inject(ActivatedRoute);
private readonly _OrdersService =inject(OrdersService);
private readonly _FormBuilder =inject(FormBuilder);
private readonly _Router =inject(Router);

ordersForm:FormGroup = this._FormBuilder.group({
  details:[null,[Validators.required,Validators.minLength(10)]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null,[Validators.required ]]
}) 

orderId:string | null='';
cashSub!:Subscription;
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      {
        next:(p)=>
        {this.orderId=p.get('id')}
      }
    )
}

onSubmit():void
{
  if(this.ordersForm.valid)
  {
    this.cashSub=this._OrdersService.CashOrders(this.orderId,this.ordersForm.value).subscribe
    (
      {
        next:(res)=>{console.log(res);
          if (res.status == 'success') {
            setTimeout(() => {
              this._Router.navigate(['/cashDetails'])
            }, 2000);
          }
        }
      }
    )
    
  }
}

ngOnDestroy(): void {
    this.cashSub?.unsubscribe();
}

}
