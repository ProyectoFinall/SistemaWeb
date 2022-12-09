import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ObrasVigasDTO } from '../../models/DTO/ObrasVigasDTO.model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  listado:ObrasVigasDTO[]=[];

  constructor(
    private message: MessageService,
    private http: HttpService,
    private loading: LoadingService) { }

  ngOnInit(): void {
    this.getItems();
  }
  async getItems(){
    this.http.get('Obra/detalles').then(res => {

      if (res && !res.error) {
        console.log(res);
        this.listado = res;
      }
    });
  }
}
