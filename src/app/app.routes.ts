import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [{
    path: 'adduser',
    component: AddUserComponent
},
{
    path: 'userlist',
    component: ListUserComponent
},
{
    path: 'edituser/:nationalcode',
    component: EditUserComponent
},
{
    path: 'home',
    component: HomeComponent
},
{
    path: 'productlist',
    component: ProductListComponent
},
{
    path: 'productadd',
    component: ProductListComponent
},
{
    path: 'productedit/:productcode',
    component: ProductListComponent
},
{
    path: '*',
    redirectTo: 'home'
}];
