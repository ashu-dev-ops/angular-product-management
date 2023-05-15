import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGurdGuard } from './auth-gurd.guard';
import { LoginComponent } from './pages/login/login.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddProductComponent } from './pages/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'register', component: AuthComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGurdGuard],
    children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: CategoryPageComponent },
      { path: 'product', component: ProductPageComponent },
      { path: 'product/:id', component: AddProductComponent },
      { path: 'add-new-product', component: AddProductComponent },
      // {
      //   path: 'product',
      //   component: ProductPageComponent,
      //   children: [
      //     { path: '', component: ProductPageComponent },
      //     { path: 'addProduct', component: AddProductComponent },
      //     { path: 'addProduct/:id', component: AddProductComponent },
      //   ],
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
