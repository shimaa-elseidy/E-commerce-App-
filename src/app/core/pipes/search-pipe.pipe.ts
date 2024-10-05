import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
  standalone: true
})
export class SearchPipePipe implements PipeTransform {

  transform(productsList:any[], searchWord: string):any[] {
    return productsList.filter((item)=>item.title.toLowerCase().includes(searchWord.toLowerCase()));
  }
  //! filter ====>has arrow function ()=> msh ()=>{} 
}
