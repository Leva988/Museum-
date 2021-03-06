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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
        // Lowercase digits
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
    const text = new fabric.Text('???????????? ?? ????????????', {
        fontSize: 30,
        fontFamily: 'Times New Roman',
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
    fabric.Object.prototype.objectCaching = false;
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
    const dx = canvas.width * 0.05;
    const dy = canvas.height * 0.45;
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
        fontFamily: 'Times New Roman',
        originY: 'center',
        textAlign: 'center'
      });
      const circle = new fabric.Circle({
         radius: canvas.height / 30,
         fill: '#53d13d',
         stroke: '#7e807c',
         strokeWidth: 5,
         originX: 'center',
         originY: 'center',
       });
      const group = new fabric.Group([circle, text], {
        top: dy + y,
        left:  dx + x,
        name: 'circle',
        selectable: false
      });
      canvas.add(group);
      canvas.renderAll();
    }
    this.animateCircles(canvas);
  }

  animateCircles(canvas) {
    const allObjects = canvas.getObjects();
    allObjects.forEach(obj => {
        if (obj.name === 'circle') {
          obj._objects[0].animate('radius',  obj._objects[0].radius * 3,
            {
              onChange: canvas.renderAll.bind(canvas),
              duration: 1000,
              easing: fabric.util.ease.easeOutBounce
            });
        }
    });
  }
}
