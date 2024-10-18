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

}
