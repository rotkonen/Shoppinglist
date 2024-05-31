import { Component } from '@angular/core';
import { ItemlistComponent } from '../itemlist/itemlist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shoppinglist',
  standalone: true,
  imports: [ItemlistComponent,FontAwesomeModule,FormsModule,CommonModule],
  templateUrl: './shoppinglist.component.html',
  styleUrl: './shoppinglist.component.css'
})
export class ShoppinglistComponent {
faPlus = faPlus;

itemName: string = "";

constructor(private productService: ProductService){}

addItem(){
  if(this.itemName.trim().length >=3){
    this.productService.addItem(this.itemName);
    this.itemName = "";
  }
}
}
