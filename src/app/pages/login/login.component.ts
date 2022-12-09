import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';
import { REGEX_EMAIL } from '../../utils/regular-expressions.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private message: MessageService,
    private loading: LoadingService
  ) {
    this.form = this.formBuilder.group({
      NumEmpleado: [],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  handleSignin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      this.message.add({
        severity: 'error',
        summary: 'Ingrese todos los campos',
        detail: '',
        life: 5000,
      });
      return;
    } else {
      this.loading.show();

      let value = this.form.value;
      console.log('Peticion');
      this.http.login(value.NumEmpleado, value.password).then((res) => {
        this.loading.close();
      });
    }
  }
}
