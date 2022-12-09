import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Consulta from 'src/app/models/consulta.model';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  form: FormGroup;
  items: Consulta = {};
  loadingS: boolean = false;

  totalItems: number = 100;
  tableOffset: number = 0;
  rowsPerPage: number = 12;
  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private http: HttpService,
    private loading: LoadingService) {
    this.form = this.formBuilder.group({
      desde: ['', [Validators.required]],
      hasta: ['', [Validators.required]],
      peso: [''],
      totalArmado: [''],
      totalSoldado: [''],
      totalPulido: [''],
      totalLimpieza: [''],
      totalPintura: [''],
      totalVigas: [''],
    });

  }

  ngOnInit(): void {
    this.form.controls['peso'].disable();
    this.form.controls['totalArmado'].disable();
    this.form.controls['totalSoldado'].disable();
    this.form.controls['totalPulido'].disable();
    this.form.controls['totalLimpieza'].disable();
    this.form.controls['totalPintura'].disable();
    this.form.controls['totalVigas'].disable();
  }


  getItems() {
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

      var desde = value.desde;
      var hasta = value.hasta;
      console.log(desde + ' ' + hasta);
      this.http.post("consultas", { desde: desde, hasta: hasta, simple: 1 }).then(res => {

        if (res && !res.error) {
          console.log(res);
          this.items = res;
          this.form.controls['peso'].setValue(res.peso);
          this.form.controls['totalArmado'].setValue(res.totalArmado);
          this.form.controls['totalSoldado'].setValue(res.totalSoldado);
          this.form.controls['totalPulido'].setValue(res.totalPulido);
          this.form.controls['totalLimpieza'].setValue(res.totalLimpieza);
          this.form.controls['totalPintura'].setValue(res.totalPintura);
          this.form.controls['totalVigas'].setValue(res.totalVigas);

        }
        this.loading.close();

      });
    }
  }

}
