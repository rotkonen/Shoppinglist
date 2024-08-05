import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-itemlist',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule,CommonModule],
  templateUrl: './itemlist.component.html',
  styleUrl: './itemlist.component.css'
})
export class ItemlistComponent {
faTrash = faTrash;
faEdit = faEdit;
faFloppyDisk = faFloppyDisk;

productEditText: string = "";
  products: Array<any> = [];

  constructor(private productService: ProductService){
    this.products= this.productService.getItems();
  }
  deleteItem(index: number){
    this.productService.deleteItem(index);
  }
  toggleCompletion(index: number){
    this.productService.productComplete(index);
  }
  enableEditing(index: number){
    this.products.forEach((product, i) => {
      if (i !== index) {
          product.editing = false;
      }
    });
    this.products[index].editing = true;
    this.productEditText = this.products[index].text;
  }
  updateProductText(index: number){
    this.productService.editProduct(index, this.productEditText);
    this.products[index].editing = false;
  }
}
