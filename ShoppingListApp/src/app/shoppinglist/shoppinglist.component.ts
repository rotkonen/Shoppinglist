import { Component, ViewChild } from '@angular/core';
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

@ViewChild('itemList') itemListComponent!: ItemlistComponent;

faPlus = faPlus;

itemName: string = '';
itemQuantity: number = 1;

constructor(private productService: ProductService){}

addItem(): void {
  if (this.itemName.trim()) {
    this.productService.addItem(this.itemName, this.itemQuantity).subscribe(
      (response) => {
        console.log('Item added:', response);
        this.clearInputs();
        this.itemListComponent.loadItems();
      },
      (error) => {
        console.error('Error adding item:', error);
      }
    );
  }
}

clearInputs(): void {
  this.itemName = '';
  this.itemQuantity = 1;
}
}
