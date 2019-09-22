import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    Ng4LoadingSpinnerModule.forRoot(),
  ]
})
export class LayoutModule { }
