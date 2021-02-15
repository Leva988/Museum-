import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger, keyframes, animation, useAnimation} from '@angular/animations';
import { KeyValue } from '@angular/common';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']

})
export class ButtonComponent implements OnInit {

  @Input() buttoncolor;
  @Input() backcolor;
  constructor() {
       // tslint:disable:only-arrow-functions
      window.addEventListener('scroll', function() {
        const scrollpos = window.pageYOffset;
        const button = document.getElementById('button');
        if (scrollpos >= 700) {
              button.style.visibility = 'visible';
            } else {
            button.style.visibility = 'hidden';
            }
      });
  }

  scrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  ngOnInit() {

  }
}
