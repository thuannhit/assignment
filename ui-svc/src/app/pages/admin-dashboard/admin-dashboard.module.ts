import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common'
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from '../../icons-provider.module';
@NgModule({
  imports: [
    CommonModule,
    AdminDashboardRoutingModule, 
    NzLayoutModule, 
    NzMenuModule, 
    IconsProviderModule,
    FormsModule],
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  bootstrap: []
})
export class AdminDashboardModule { }
