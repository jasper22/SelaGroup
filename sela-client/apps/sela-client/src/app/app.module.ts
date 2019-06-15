import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule} from '@sela-client/material';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from '../services/auth/auth.guard';
import { HeadersInterceptor } from '../services/auth/headers.interceptor';

@NgModule({
  declarations: [AppComponent, 
                LoginComponent, 
                ProductsGridComponent, 
                ProductDetailsComponent, 
                UserCartComponent,
                PageNotFoundComponent
              ],
  imports: [BrowserModule, 
            ReactiveFormsModule,
            RouterModule.forRoot([
              {
                path: 'login',
                component: LoginComponent
              },
              {
                path: 'products',
                component: ProductsGridComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'product/:id',
                component: ProductDetailsComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'cart',
                component: UserCartComponent,
                canActivate: [AuthGuard]
              },
              {
                path: '',
                redirectTo: '/products', pathMatch: 'full'
              },
              {
                path: '**',
                component: PageNotFoundComponent
              }
            ]),
            BrowserAnimationsModule,
            ScrollingModule,
            HttpClientModule,
            MaterialModule],
            
  providers: [AuthService, 
              AuthGuard,
              { provide: HTTP_INTERCEPTORS , useClass: HeadersInterceptor, multi: true }
            ],
  bootstrap: [AppComponent]
})
export class AppModule {}
