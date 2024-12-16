import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const routes: Routes = [{
    path: 'login',
    component:LoginComponent
},{
    path: 'adduser',
    component: AddUserComponent
},
{
    path: 'userlist',
    component: ListUserComponent
},
{
    path: 'edituser/:username',
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
    component: ProductAddComponent
},
{
    path: 'productedit/:code',
    component: ProductEditComponent
},
{
    path: '*',
    redirectTo: 'home'
}];
