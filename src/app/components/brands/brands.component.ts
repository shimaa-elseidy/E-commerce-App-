import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HomeServiceService } from '../../core/services/home-service.service';
import { Subscription } from 'rxjs';
import { Ibrands } from '../../core/interfaces/ibrands';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit ,OnDestroy {
private readonly _HomeServiceService =inject(HomeServiceService);

brandsList:Ibrands[]=[];
brandsSub!:Subscription;
isClicked:boolean=false;
Src:string=''

ngOnInit(): void {
    this.brandsSub = this._HomeServiceService.getBrands().subscribe(
      {
        next:(res)=>{
          this.brandsList=res.data
        }
      }
    )
}

imgClick(imgSrc:string):void
{
  this.isClicked=true;
  this.Src=imgSrc
}
close():void
{
  this.isClicked=false;
}

ngOnDestroy(): void {
    this.brandsSub?.unsubscribe();
}
}








