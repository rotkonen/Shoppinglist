import { Routes } from '@angular/router';
import { LoginComponent } from './signup/login/login.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: "", component:LoginComponent},
    { path: "shopping-list", component:ShoppinglistComponent, canActivate: [AuthGuard]},
    { path: "item-list", component:ItemlistComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: ''}
];
