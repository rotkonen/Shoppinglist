import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  itemArray: { content: string, completed: boolean}[] = [
    {content: "Jauheliha",completed: false},
    {content: "Kurkku",completed: false},
    {content: "Tomaatti",completed: false}
    ];
  addItem(itemText: string){
    this.itemArray.push({content: itemText, completed: false});
  }
  getItems(){
    return this.itemArray;
  }
  deleteItem(index: number){
    this.itemArray.splice(index,1);
  }
  productComplete(index: number){
    this.itemArray[index].completed = !this.itemArray[index].completed
  }
  editProduct(index: number, newProduct: string) {
    if (newProduct.trim()) {
      this.itemArray[index].content = newProduct;
    }
  }
}
