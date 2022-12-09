import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  NumEmpleado: number = 0;
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpService, private formBuilder: FormBuilder,
    private loading: LoadingService,
    private message: MessageService

    ) {
    this.form = this.formBuilder.group({
      NumEmpleado: [0, [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
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
    } else{
    let user = this.form.value;
    console.log({
      NumEmpleado: user.NumEmpleado,
      contraseña: user.password,
    });
    this.loading.show();
    this.http
      .put('Usuarios', {
        NumEmpleado: user.NumEmpleado,
        Contraseña: user.password,
      })
      .then((res) => {
        this.loading.close();
        this.form.reset();
      });
    }
  }
}
