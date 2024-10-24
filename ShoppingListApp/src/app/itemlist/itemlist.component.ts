import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ItemlistComponent implements OnInit {
faTrash = faTrash;
faEdit = faEdit;
faFloppyDisk = faFloppyDisk;

items: any[] = [];

constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadItems();

    this.productService.itemAdded$.subscribe(() => {
      this.loadItems();
    });
  }

  loadItems(): void {
    this.productService.getItems().subscribe((data: any) => {
      this.items = data;
    });
  }

  deleteItem(item: any): void {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      this.productService.deleteItem(item._id).subscribe(
        () => {
          this.items = this.items.filter(i => i._id !== item._id);
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
    }
  }
  
  toggleCollected(item: any): void {
    const previousStatus = item.collected;
    item.collected = !item.collected;
    this.productService.updateCollectedStatus(item._id, item.collected).subscribe(
      (updatedItem) => {
        item.collected = updatedItem.collected;
      },
      (error) => {
        console.error('Error updating collected status:', error);
        item.collected = previousStatus;
      }
    );
  }

}
