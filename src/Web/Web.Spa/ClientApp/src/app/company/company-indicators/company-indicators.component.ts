import { Component, OnInit, ɵConsole } from '@angular/core';
import { Chart } from 'chart.js';
import { CompanyService } from '../companyservice/company-service.service';
import {fabric} from 'fabric';
import { environment } from 'src/environments/environment';
import { Department } from 'src/app/models/department';
import { Coords } from 'src/app/models/coords';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-company-indicators',
  templateUrl: './company-indicators.component.html',
  styleUrls: ['./company-indicators.component.scss'],
  providers: [CompanyService]
})

export class CompanyIndicatorsComponent implements OnInit {

  canvas;
  chart: Chart;
  depNames: string [] = [];
  employeesNumbers: number[] = [];
  cityNumbers: number[] = Array<number>(6).fill(0);
  percents: number [] = [];
  colors: string [] = [];
  bossesnumber = 0;
  x: number;
  y: number;
  dt: number;
  startAngle = 0;
  endAngle;
  url = environment.backendUrl + '/Departments';

  constructor(private depService: CompanyService) {
  }

  ngOnInit() {
   this.getDepartments();
   window.onresize = () => {
    this.canvas.clear();
    window.onresize = () => {
      const width  = window.outerWidth;
      const height = window.outerHeight;
      this.canvas.clear();
      const k = ( document.documentElement.clientHeight / height +  document.documentElement.clientWidth / width ) / 2;
      this.canvas.remove(this.canvas.getObjects());
      const w  = window.innerWidth;
      const h = window.innerHeight / 1.4;
      this.canvas.setHeight(h);
      this.canvas.setWidth(w);
      const coords = this.drawFigure(this.canvas);
      this.placeMap(coords, this.canvas, k);
      this.addDepartmentCirles(coords, this.canvas, k);
      this.addHumans(coords, this.canvas, k);
      this.drwaChart(coords, this.canvas, k);
      this.canvas.renderAll();
    };
   };
  }

  getDepartments() {
    this.depService.getStruct(this.url).subscribe(
      // tslint:disable: no-shadowed-variable
      (data: Department[]) => {
        data.forEach((dep) => {
          this.employeesNumbers.push(dep.employeesNumber);
          this.colors.push(dep.color);
          this.depNames.push(dep.shortName);
        });
        this.getPeople();
  },
     error => console.log(error));
  }

   getPeople() {
   this.depService.getPeople(environment.backendUrl + '/Employees').subscribe(
    (data: Employee[]) => {
        data.forEach((emp) => {
          if (emp.type === 'boss' && emp.departmentId === '') {
            this.bossesnumber += 1;
          }
          switch (emp.region) {
            case 'Brest':
              this.cityNumbers[0] += 1;
              break;
            case 'Vitebsk':
              this.cityNumbers[1] += 1;
              break;
            case 'Gomel':
              this.cityNumbers[2] += 1;
              break;
            case 'Grodno':
              this.cityNumbers[3] += 1;
              break;
            case 'Minsk':
              this.cityNumbers[4] += 1;
              break;
            case 'Mogilev':
              this.cityNumbers[5] += 1;
              break;
          }
        });
        this.employeesNumbers.push(this.bossesnumber);
        this.colors.push('#474747');
        this.depNames.push('Руководство');
        const employees = this.employeesNumbers.reduce((sum, current) => sum + current);
        this.employeesNumbers.forEach(emp => {
          const percent =  (emp / employees) * 100;
          this.percents.push(percent);
        });
        this.drawCanvas();
    },
    // tslint:disable-next-line: no-shadowed-variable
    error => console.log(error));
  }

  drawCanvas() {
    this.canvas = new fabric.Canvas('canvas');
    const width  = window.outerWidth;
    const height = window.outerHeight;
    this.canvas.setHeight(height / 1.4);
    this.canvas.setWidth(width);
    // Коэффициент изменения окна
    let k = ( document.documentElement.clientHeight / height +  document.documentElement.clientWidth / width ) / 2;
    const coords = this.drawFigure(this.canvas);
    this.placeMap(coords, this.canvas, k);
    this.addDepartmentCirles(coords, this.canvas, k);
    this.drwaChart(coords, this.canvas, k );
    const extraHumans = this.canvas.getObjects();
    for (let i = 0, len = this.canvas.size(); i < len; i++) {
        if (extraHumans[i].name && extraHumans[i].name === 'sprite') {
          this.canvas.remove(extraHumans[i]);
         }
        }
    this.addHumans(coords, this.canvas, k);
    this.canvas.renderAll();
  }

  drawFigure(canvas) {
    const x1 = canvas.width * 0.3;
    const x2 = canvas.width * 0.7;
    const y1 =  canvas.height * 0.1;
    const y2 =  canvas.height * 0.9;
    const radius = (y2 - y1) / 2;
    const upperLine = new fabric.Line([x1, y1, x2, y1], {
      name: 'line1',
      strokeDashArray: [10, 10],
      strokeWidth: 2,
      fill: '',
      stroke: 'grey',
      selectable: false,
    });
    const lowerLine = new fabric.Line([x1, y2, x2, y2], {
      name: 'line2',
      strokeDashArray: [10, 10],
      strokeWidth: 2,
      fill: '',
      stroke: 'grey',
      selectable: false,
    });

    const leftArc = new fabric.Circle({
      radius,
      left: - radius + x1,
      top: y1,
      startAngle: Math.PI / 2,
      endAngle: 3 / 2 * Math.PI,
      selectable: false,
      stroke: 'grey',
      strokeWidth: 2,
      strokeDashArray: [10, 10],
      fill: ''
    });

    const rightArc = new fabric.Circle({
      radius,
      left: x2 - radius,
      top: y1,
      startAngle: 3 / 2 * Math.PI,
      endAngle: Math.PI / 2,
      selectable: false,
      stroke: 'grey',
      strokeWidth: 2,
      strokeDashArray: [10, 10],
      fill: ''
    });
    canvas.add(upperLine, lowerLine, leftArc, rightArc);
    const coords = new Coords();
    coords.x1 = x1;
    coords.x2 = x2;
    coords.y1 = y1;
    coords.y2 = y2;
    coords.radius = radius;
    return coords;
  }

  placeMap(coords: Coords, canvas, koef) {
    const img = new Image();
    img.src = '/assets/images/company/republic.png';
    img.onload = () => {
      const republic = new fabric.Image(img, {
        name: 'republic',
        left: coords.x1  - coords.radius / 1.5,
        top: coords.y1 + coords.radius / 4,
        hoverCursor: 'pointer',
        selectable: false
      });
      // Brest
      this.cityCircles(coords.x1 - coords.radius / 4, coords.y2 - coords.radius / 1.5, this.cityNumbers[0], canvas, koef, coords);
      // Vitebsk
      this.cityCircles(coords.x1 + coords.radius / 3, coords.y1 + coords.radius / 1.8, this.cityNumbers[1], canvas, koef, coords);
      // Gomel
      this.cityCircles(coords.x1 + coords.radius / 2 , coords.y2 - coords.radius / 2, this.cityNumbers[2], canvas, koef, coords);
      // Grodno
      this.cityCircles(coords.x1 - coords.radius / 2.5, coords.y1 + coords.radius, this.cityNumbers[3], canvas, koef, coords);
      // Minsk
      this.cityCircles(coords.x1 + coords.radius / 8,  coords.y1 + coords.radius, this.cityNumbers[4], canvas, koef, coords);
      // Mogilev
      this.cityCircles(coords.x1 + coords.radius / 1.7, coords.y1 + coords.radius, this.cityNumbers[5], canvas, koef, coords);
      this.animateCircles(canvas);
      canvas.add(republic);
      republic.scaleToWidth(canvas.width / 1.8);
      republic.scaleToHeight(canvas.height / 1.8);
    };
  }

  addDepartmentCirles(coords: Coords, canvas, koef) {
    // this.percents = [5, 5, 5, 5, 5, 5, 5, 10, 15, 15, 10, 10, 10];
    const r = coords.radius;
    let nameCoords;
    let curve = 0;
    let angle = 0;
    let nameAngle = 0;
    let sin = 0;
    let cos = 0;
    const perimetr = (coords.x2 - coords.x1) * 2 + (2 * Math.PI * r);
    this.dt = 0;
    for (let i = 0; i < this.percents.length; i++) {
      if (i === 0) {
        this.x = coords.x1;
        this.y = coords.y1;
        nameAngle = 300;
        nameCoords = {x: this.x - 20, y: this.y - 10 };
      } else {
        this.dt = this.dt + perimetr * this.percents[i - 1] / 100;
        switch (true) {
          case (this.dt >= 0 && this.dt <= (coords.x2 - coords.x1)):
            this.x = coords.x1 + this.dt;
            this.y = coords.y1;
            nameAngle = 300;
            nameCoords = {x: this.x - 20, y: this.y - 10 };
            break;
          case (this.dt > (coords.x2 - coords.x1) && this.dt < (coords.x2 - coords.x1) + Math.PI * r):
            curve = this.dt - (coords.x2 - coords.x1);
            angle =  curve /  r ;
            sin = Math.sin(angle);
            cos = Math.cos(angle);
            this.x = coords.x2 + r * sin;
            this.y = coords.y1 + r * (1 - cos);
            nameCoords = {x: this.x + 20, y: this.y };
            nameAngle = 0;
            break;
          case (this.dt >= (coords.x2 - coords.x1) + Math.PI * r && this.dt <= 2 * (coords.x2 - coords.x1) + Math.PI * r):
            angle = 0;
            this.x =  coords.x2 - (this.dt - (coords.x2 - coords.x1) - Math.PI * r);
            this.y = coords.y2;
            nameCoords = {x: this.x - 20, y: this.y + 60 };
            nameAngle = 300;
            break;
          case (this.dt > 2 * (coords.x2 - coords.x1) + Math.PI * r && this.dt < perimetr):
            curve = this.dt - (2 * (coords.x2 - coords.x1) + Math.PI * r);
            angle =  curve /  r ;
            sin = Math.sin(angle);
            cos = Math.cos(angle);
            this.x = coords.x1 - r * sin;
            this.y = coords.y1 + r * (1 + cos);
            if (this.y > coords.y1 + coords.radius) {
              nameCoords = {x: this.x - 50, y: this.y + 10 };
            } else {
            nameCoords = {x: this.x - 40, y: this.y - 20 };
            }
            nameAngle = 0;
            break;
          default:
            alert('Переполнение массива отделов!');
            break;
        }
      }
      // tslint:disable: max-line-length
      this.departmentCircles(this.colors[i], this.x, this.y, this.employeesNumbers[i].toString(), this.depNames[i].toString(), nameCoords.x, nameCoords.y, nameAngle, canvas, koef);
    }
  }

  departmentCircles(color, dx, dy, empNumber, depName, nx, ny, angle, canvas, koef) {
    const circle = new fabric.Circle({
      radius: 10 * koef / 3,
      name: 'department',
      left:  dx,
      top: dy,
      selectable: false,
      hoverCursor: 'pointer',
      fill: color,
      stroke: '',
      originX: 'center',
      originY: 'center'
    });
    const digit = new fabric.Text (empNumber, {
      fontSize: 15 * koef,
      left:  dx,
      top: dy,
      selectable: false,
      hoverCursor: 'pointer',
      fill: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      originY: 'center'
    });
    const name = new fabric.Text (depName, {
      fontSize: 12 * koef,
      fill: 'grey',
      left: nx,
      top: ny,
      angle,
      fontWeight: 'bold',
      selectable: false
    });
    canvas.add(circle, digit, name);
  }

  cityCircles(dx, dy, empNumber, canvas, koef, coords) {
    const digit = new fabric.Text (empNumber.toString(), {
      fontSize: 20 * koef,
      left:  dx,
      top: dy,
      selectable: false,
      fill: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
    });
    if (empNumber > 100) {
      empNumber = empNumber / 2.5;
    }
    const circle = new fabric.Circle({
      left:  dx,
      top: dy,
      name: 'city',
      radius: coords.radius * 0.004 * empNumber / 2.5,
      fill: '#00B5F9',
      stroke: '',
      originX: 'center',
      originY: 'center',
      hoverCursor: 'pointer',
      selectable: false
    });
    canvas.add(circle, digit);
  }

  addHumans(coords: Coords, canvas, koef) {
     // tslint:disable prefer-for-of
     let curve = 0;
     let angle = 0;
     let sin = 0;
     let cos = 0;
     let color;
     const r = coords.radius - coords.y1 / 3;
     const sum = this.employeesNumbers.reduce((sum, current) => sum + current);
     const perimetr =  (coords.x2 - coords.x1) * 2 + 2 * (Math.PI * r);
     const dh = perimetr / sum;
     this.dt = 0;
     let i = 0;
     for (let j = 0; j < sum; j++) {
       this.dt = dh * j;
       this.x = coords.x1 + this.dt;
       this.y = coords.y1 + coords.y1 / 3;
       switch (true) {
         case(this.dt >= coords.x2 - coords.x1 && this.dt < coords.x2 - coords.x1 + Math.PI * r):
           curve =  this.dt  - (coords.x2 - coords.x1);
           angle =  curve /  r;
           sin = Math.sin(angle);
           cos = Math.cos(angle);
           this.x = coords.x2 + r * sin;
           this.y = coords.y1 + r * (1 - cos) +  coords.y1 / 3;
           angle = angle * j / 2;
           if (angle >= 180) {
             angle = 180;
           }
           break;
         case (this.dt >= coords.x2 - coords.x1 + Math.PI * r && this.dt < 2 * (coords.x2 - coords.x1) + Math.PI * r):
           angle = 0;
           this.x =  coords.x2 - (this.dt - (coords.x2 - coords.x1) - Math.PI * r) ;
           this.y = coords.y2 - coords.y1 / 3;
           angle = 180;
           break;
         case (this.dt >= 2 * (coords.x2 - coords.x1) + Math.PI * r  && this.dt < perimetr):
           curve = this.dt - (2 * (coords.x2 - coords.x1) + Math.PI * r);
           angle =  curve /  r;
           sin = Math.sin(angle);
           cos = Math.cos(angle);
           this.x = coords.x1 - r  * sin;
           this.y = coords.y1 + r * (1 + cos) + coords.y1 / 3;
           angle = 180 + angle * j / 4;
           if (angle >= 360) {
            angle = -5;
          }
           break;
       }
       // Painting humans
       const arr = this.employeesNumbers.slice(0, i + 1);
       const num = arr.reduce((sum, current) => sum + current);
       if (j < num) {
         i = i;
       } else {
          i = i + 1;
       }
       color = this.colors[i];
       this.paintHumans(canvas, color, angle, this.x, this.y, 0.6, koef);
     }
  }

  paintHumans(canvas, color, angle, left, top, size, koef) {
      const sprite = new Image();
      sprite.src = '/assets/images/company/sprite-0.png';
      sprite.onload = () => {
        const img = new fabric.Image(sprite, {
          name: 'sprite',
          left,
          top,
          hoverCursor: 'pointer',
          scaleX: size * koef,
          scaleY : size * koef,
          selectable: false,
          angle
        });
        img.filters.push(new fabric.Image.filters.BlendColor({
          color,
          mode: 'tint',
        }));
        img.applyFilters();
        canvas.add(img);
      };
  }

  drwaChart(coords: Coords, canvas, koef) {
    const text = new fabric.Text ('Списочная численность', {
      fontSize: 20 * koef,
      fill: '#00B5F9',
      fontWeight: 'bold',
      textAlign: 'center',
      left: coords.x2 / 1.3,
      top: coords.y1 * 2,
      hoverCursor: 'pointer',
      selectable: false
    });
    canvas.add(text);
    // this.percents = [10, 20 , 15 , 25, 10, 10, 5, 2, 3];
    // this.colors = ['red', 'blue', ' grey', ' green', 'purple', 'black', 'white', 'orange', 'yellow'];
    for (let i = 0; i < this.percents.length; i++) {
      const rad = Math.PI / 180;
      if (i === 0) {
          this.startAngle = 0;
      } else {
        this.startAngle = this.startAngle + this.percents[i - 1] * 360 * rad / 100;
      }
      this.endAngle = this.startAngle + this.percents[i] * 360 * rad / 100;
      const radius = coords.radius * 0.5;
      const center = {x: coords.x2, y:  coords.y1 * 5 };
      const name = new fabric.Text (this.depNames[i], {
        fontSize: 18 * koef,
        fill: this.colors[i],
        fontWeight: 'bold',
        textAlign: 'center',
        opacity: 0,
        name: 'sectorName',
        left: center.x,
        top: center.y + radius,
        hoverCursor: 'pointer',
        selectable: false
      });
      const arc = new fabric.Circle ({
        originX: 'center',
        originY: 'center',
        left: center.x,
        top: center.y,
        fill: this.colors[i],
        startAngle: this.startAngle,
        endAngle: this.endAngle,
        radius,
        angle: -90
      });
      const x1 = center.x + radius * Math.sin(this.startAngle);
      const y1 = center.y - radius * Math.cos(this.startAngle);
      const x2 = center.x + radius * Math.sin(this.endAngle);
      const y2 = center.y - radius * Math.cos(this.endAngle);
      const tri = new fabric.Polygon([center, {x: x1, y: y1},  {x: x2, y: y2}], {fill: this.colors[i],  originX: 'center',
      originY: 'center', stroke: this.colors[i], strokeWidth: 2});
      const sector = new fabric.Group([arc, tri], {
        name: 'sector',
        originX: 'center',
        originY: 'center',
        selectable: false,
        hoverCursor: 'pointer'
       });
      canvas.add(sector, name);
    }
  }

  animateCircles(canvas) {
    const infografic = document.getElementById('infografic');
    let state = false;
    const objects = canvas.getObjects();
    const sectors = [];
    const sectorNames = [];
    const circles = [];
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].name === 'city' || objects[i].name === 'department') {
        circles.push(objects[i]);
      }
      if (objects[i].name === 'sector') {
        sectors.push(objects[i]);
      }
      if (objects[i].name === 'sectorName') {
        sectorNames.push(objects[i]);
      }
    }
    window.onscroll = () => {
    if (window.pageYOffset >= infografic.offsetTop - 220 && !state) {
        for (let j = 0; j < circles.length; j++) {
          circles[j].animate('radius', circles[j].radius * 3,  {
             onChange: canvas.renderAll.bind(canvas),
             duration: 1000,
             easing: fabric.util.ease.easeOutBounce
           });
          state = true;
         }
       }
    };
  }

}
