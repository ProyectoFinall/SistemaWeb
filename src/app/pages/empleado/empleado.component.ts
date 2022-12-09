import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import User from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  REGEX_NAMES,
  REGEX_PHONE,
} from 'src/app/utils/regular-expressions.utils';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
})
export class EmpleadoComponent implements OnInit {
  form: FormGroup;
  user: User = {};

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private auth: AuthService,
    private message: MessageService,
    private loading: LoadingService
  ) {
    this.form = this.formBuilder.group({
      NumEmpleado: [0, Validators.required],
      NomEmpleado: ['', Validators.required],
      Apaterno: ['', Validators.required],
      Amaterno: ['', Validators.required],
      Puesto: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.form.invalid) {
      console.log('invalid');
      this.message.add({
        severity: 'error',
        summary: 'Ingrese todos los campos',
        detail: '',
        life: 5000,
      });
      return;
    } else {
      this.loading.show();
      let empleado = this.form.value;
      this.user = empleado;
      this.http.put('Empleados', this.user).then((res) => {
        this.loading.close();
        this.form.reset();
        console.log(res);
        console.log(res.data);
        console.log(res.data.numEmpleado);
        // this.message.add({
        //   severity: 'success',
        //   summary: 'Empleado registrado correctamente!!',
        //   detail: '',
        //   life: 5000,
        // });
      });
    }
  }
  alphaNumberOnly(e: any) {
    // Accept only alpha numerics, not special characters
    var regex = new RegExp('^[a-zA-Z0-9 ]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    console.log(str);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    return false;
  }
}
