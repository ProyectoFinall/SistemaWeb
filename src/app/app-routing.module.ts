import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegisterComponent } from './pages/register/register.component';
import { ObraComponent } from './pages/obra/obra.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { CodigoQRComponent } from './pages/codigo-qr/codigo-qr.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "menu", component: MenuComponent },
  { path: "informacion", component: InformacionComponent },
  { path: "consultas", component: ConsultasComponent},
  { path: "obra", component: ObraComponent},
  { path: "empleado", component: EmpleadoComponent },
  { path: "codigo-qr", component: CodigoQRComponent },
  { path: "listado", component: ListadoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
