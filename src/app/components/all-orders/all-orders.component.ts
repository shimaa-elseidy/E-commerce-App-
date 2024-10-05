import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { IOrders } from '../../core/interfaces/iorders';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [NgFor,NgIf,DatePipe,RouterLink],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit, OnDestroy{
private readonly _OrdersService = inject(OrdersService);
private readonly _AuthServiceService = inject(AuthServiceService);
ordersSub!:Subscription;
userId:string|null=null;
orderList:IOrders[]=[];
order: any;
ngOnInit(): void {


  this.userId  = this._AuthServiceService.saveUserToken();
    this.ordersSub = this._OrdersService.getAllOrders(this.userId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.orderList=response;
          this.order = this.orderList[0];
          
        },
      }
    );

}




ngOnDestroy(): void {
    this.ordersSub?.unsubscribe();
}

}
