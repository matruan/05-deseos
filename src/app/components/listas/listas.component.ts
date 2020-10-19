import { TabsPageRoutingModule } from './../../pages/tabs/tabs-routing.module';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { DeseosService } from './../../services/deseos.service';
import { IonList, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList, {static: false}) lista: IonList;
  @Input() terminada = true;
  constructor(public deseosService: DeseosService, private router: Router, private alertController: AlertController) {
  }
  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
       this.router.navigate([`tabs/tab2/agregar/${lista.id}`]);
    } else {
      this.router.navigate([`tabs/tab1/agregar/${lista.id}`]);
    }
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async editarNombre(lista: Lista) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar nombre',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();

  }

}
