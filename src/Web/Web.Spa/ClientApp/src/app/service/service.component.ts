import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Service } from '../models/service';
import { environment } from 'src/environments/environment';
import { fabric } from 'fabric';
import { Repos } from './service/repos.service';
import { Production } from '../models/production';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductionNew } from '../models/productionNew';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-business',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  providers: [Repos]
})

export class ServiceComponent implements OnInit {

  canvas;
  x: number;
  y: number;
  dt: number;
  services: Service[] = [];
  productions: ProductionNew[] = [];
  productionUrl = environment.backendUrl + '/Production';
  constructor(private repos: Repos, private http: HttpClient) {

  }

  ngOnInit() {
    this.getServices();
    this.getProduction();
  }

  getServices() {
    this.repos.getServices().subscribe(
      (data: Service[]) => {
        this.services = data;
        this.drawCanvas();
      },
      error => console.log(error)
    );
  }

  getProduction() {
    this.repos.getProduction().subscribe(
      (data: Production[]) => {
        data.forEach( prod => {
          const p: ProductionNew = new ProductionNew();
          p.id = prod.id;
          p.name = prod.name;
          p.items = [];
          prod.items.forEach(item => {
            const icon = {key: item, value: this.getDescription(p.id, item)};
            p.items.push(icon);
          });
          this.productions.push(p);
         }
        );
      },
      error => console.log(error)
    );
  }

  getDescription(id: string, itemid: string): Observable<string> {
    return this.http.get(this.productionUrl + '/' + id + '/iconDescription/' + itemid, {responseType: 'text'}).
      pipe(map(data => {
        let desc = data.toString();
        const sub = desc.match(/\d+/g);
        if (!isNullOrUndefined(sub)) {
          sub.forEach(s => {
            desc = desc.replace(new RegExp(s) , '<sub>' + s + '</sub>');
          });
        }
        return desc;
      }));
  }

  drawCanvas() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.clear();
    const text = new fabric.Text('Работы и услуги', {
        fontSize: 30,
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
        textAlign: 'center'
      });
    const circle = new fabric.Circle({
         radius: this.canvas.width * 0.2,
         fill: '#53d13d',
         stroke: '#7e807c',
         strokeWidth: 5,
         originX: 'center',
         originY: 'center',
       });
    const group = new fabric.Group([circle, text], {
        top: this.canvas.height * 0.3,
        left: this.canvas.width * 0.3,
        selectable: false
      });
    this.canvas.add(group);
    this.addCircles(this.canvas);
    this.canvas.renderAll();
  }

  addCircles(canvas) {
    // Perimetr Circle
    const r = ( canvas.width + canvas.height) * 0.2;
    const perimetr = 2 * Math.PI * r;
    this.dt = 0;
    let angle = 0;
    let sin = 0;
    let cos = 0;
    let x = 0;
    let y = 0;
    const dx = 10;
    const dy = canvas.height * 0.4;
    for (const [index, serv] of this.services.entries()) {
      if (index === 0) {
        x = 0;
        y = 0;
      } else {
        this.dt = this.dt + perimetr / this.services.length;
        angle = this.dt / r;
        switch (true) {
          case (angle < Math.PI / 2):
            sin = Math.sin(angle);
            cos = Math.cos(angle);
            y = -r * sin;
            x = r - r * cos;
            break;
          case (angle > Math.PI / 2 && angle < Math.PI):
            sin = Math.sin(Math.PI - angle);
            cos = Math.cos(Math.PI - angle);
            y = -r * sin;
            x = r + r * cos;
            break;
          case (angle > Math.PI && angle < 3 / 2 * Math.PI):
            sin = Math.sin(angle - Math.PI);
            cos = Math.cos(angle - Math.PI);
            y = r * sin;
            x = r + r * cos;
            break;
          case (angle >  3 / 2 * Math.PI  && angle < 2 * Math.PI):
            sin = Math.sin(angle - Math.PI);
            cos = Math.cos(angle - Math.PI);
            y = r * sin;
            x = r + r * cos;
            break;
        }
      }
      const text = new fabric.Textbox(serv.name, {
        fontSize: 15,
        originX: 'center',
        originY: 'center',
        textAlign: 'center',
        borderScaleFactor: 2
      });
      const circle = new fabric.Circle({
         radius: canvas.height / 10,
         fill: '#53d13d',
         stroke: '#7e807c',
         strokeWidth: 5,
         originX: 'center',
         originY: 'center',
       });
      const group = new fabric.Group([circle, text], {
        top: dy + y,
        left:  dx + x,
        selectable: false
      });
      canvas.add(group);
      canvas.renderAll();
    }

  }
}
