import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IOrders } from '../../core/interfaces/iorders';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cash-detail',
  standalone: true,
  imports: [NgIf,DatePipe,NgFor,NgClass , RouterLink],
  templateUrl: './cash-detail.component.html',
  styleUrl: './cash-detail.component.scss'
})
export class CashDetailComponent implements OnInit {
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
          error: (error) => {
            console.log(error);
          },
        }
      );
  
  }
  
  
  
  
  ngOnDestroy(): void {
      this.ordersSub?.unsubscribe();
  
    
}
}
