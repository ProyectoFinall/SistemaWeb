import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MenuComponent } from './pages/menu/menu.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { NavigateComponent } from './navigate/navigate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ObraComponent } from './pages/obra/obra.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CodigoQRComponent } from './pages/codigo-qr/codigo-qr.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {InputTextModule} from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from './pages/utils/loading/loading.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ListadoComponent } from './pages/listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    InformacionComponent,
    ConsultasComponent,
    NavigateComponent,
    ObraComponent,
    EmpleadoComponent,
    CodigoQRComponent,
    LoadingComponent,
    ListadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxQRCodeModule,
    ToastModule,
    DynamicDialogModule,
    ButtonModule,
    MatProgressSpinnerModule,
    InputTextModule,
    ProgressSpinnerModule,
    DropdownModule,
    TableModule,
    SkeletonModule,
    RouterModule.forRoot([{ path: '', component: LoginComponent }]),
  ],
  providers: [CookieService, MessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
