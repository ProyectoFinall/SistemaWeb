import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Viga from 'src/app/models/viga.model';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss']
})
export class CodigoQRComponent implements OnInit {
  ClvViga: number =0;
  Viga: Viga = {};
  desViga: string = '';
  constructor() { 
    // this.ClvViga = parseInt(localStorage.getItem('ClvViga')!.toString());
    // this.Viga = JSON.parse(localStorage.getItem('Viga')??'');
    // this.desViga = 
    //   "Clave de la viga: " + this.Viga.ClvViga + "\n" +
    //   "Largo (mts): " + this.Viga.LargoViga + "\n" +
    //   "Peso (Kg): " + this.Viga.PesoViga + "\n" +
    //   "Material: " + this.Viga.Material + "\n" +
    //   "Fecha de Registro: " + this.Viga.FechaViga;
    //   console.log(this.desViga);
  }

  ngOnInit(): void {
  }

  elementType=NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value= localStorage.getItem('Viga')??''; //this.desViga;

}

