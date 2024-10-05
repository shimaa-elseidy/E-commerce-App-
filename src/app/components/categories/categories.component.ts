import { TranslateModule } from '@ngx-translate/core';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HomeServiceService } from '../../core/services/home-service.service';
import { Icategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit ,OnDestroy {
private readonly _HomeServiceService =inject(HomeServiceService);

catList:Icategory[]=[];
AllCatSub!:Subscription;

ngOnInit(): void {
  this. AllCatSub=this._HomeServiceService.getAllCategories().subscribe({
      next:(res)=>{console.log(res.data);
        this.catList=res.data
      }
    })
}

ngOnDestroy(): void {
    this.AllCatSub?.unsubscribe();
}
}
