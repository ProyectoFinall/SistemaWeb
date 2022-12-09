import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import User from 'src/app/models/user.model';
import Viga from 'src/app/models/viga.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent implements OnInit {
  form: FormGroup;
  clvObra: number = 0;
  user: User = {};
  viga: Viga = {};
  isDisabled = true;
  desViga: string = '';

  combos: any = {
    obras: [],
  };
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private auth: AuthService,
    private message: MessageService,
    private loading: LoadingService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      clvObra: [0, Validators.required],
      ClvViga: [0, Validators.required],
      LargoViga: [0, Validators.required],
      PesoViga: [0, Validators.required],
      Material: ['', Validators.required],
      NumEmpleado: [0, Validators.required],
    });
  }

  getItem(Id: number) {
    this.loading.show();
  }
  ngAfterViewInit(): void {
    this.loading.show();
    this.getCombos('Obra');
  }
  ngOnInit(): void {
    // this.form.controls['ClvViga'].disable();
  }
  getCombos(filter: string) {
    this.http.get(`${filter}`).then((res) => {
      if (res && !res.error) {
        this.combos[filter] = res;
        this.loading.close();
      }
    });
  }
  BuscarViga() {
    this.loading.show();
    let vigas = this.form.value;
    this.clvObra = vigas.ClvViga;
    this.http.get('Viga/GetById?ClvViga=' + vigas.ClvViga).then((res) => {
      console.log(res);
      if (res && !res.error) {
        console.log(res);
        this.form.controls['clvObra'].setValue(res.clvObra);
        this.form.controls['Material'].setValue(res.material);
        this.form.controls['PesoViga'].setValue(res.pesoViga);
        this.form.controls['LargoViga'].setValue(res.largoViga);
        this.isDisabled = true;
      } else {
        this.form.reset();
        this.form.controls['ClvViga'].setValue(vigas.ClvViga);
        // this.message.add({
        //   severity: 'info',
        //   summary: 'No se encontró ninguna viga con ese número!!',
        //   detail: '',
        //   life: 5000,
        // });
      }
      this.loading.close();
    });
  }
  GuardarViga() {
    console.log(this.form);
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
      let vigas = this.form.value;
      this.user = this.auth.getUser();
      this.viga = vigas;
      this.viga.NumEmpleado = this.user.NumEmpleado;
      this.http.put('Viga', this.viga).then((res) => {
        this.loading.close();
        console.log('res');
        console.log(res.data);
        if (res.error == 'success') {
          // this.form.reset();
          // this.message.add({
          //   severity: 'success',
          //   summary: 'Viga guardada correctamente!!',
          //   detail: '',
          //   life: 5000,
          // });
          this.SendQR(res.data);
        } else {
          // this.message.add({
          //   severity: 'info',
          //   summary: res.message,
          //   detail: '',
          //   life: 5000,
          // });
        }
      });
    }
  }

  SendQR(viga: any) {
    if (this.form.invalid) {
      console.log('invalid');
      this.message.add({
        severity: 'error',
        summary: 'Seleccione una viga para generar el QR',
        detail: '',
        life: 5000,
      });
      return;
    } else {
      this.desViga = viga.clvViga;

      localStorage.setItem('Viga', this.desViga);
      this.router.navigate(['/codigo-qr']);
    }
  }
}
