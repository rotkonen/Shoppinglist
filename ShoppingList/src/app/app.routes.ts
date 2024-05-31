import { Routes } from '@angular/router';
import { LoginComponent } from './signup/login/login.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ItemlistComponent } from './itemlist/itemlist.component';

export const routes: Routes = [
    { path: "", component:LoginComponent},
    { path: "shopping-list", component:ShoppinglistComponent},
    { path: "item-list", component:ItemlistComponent}
];
