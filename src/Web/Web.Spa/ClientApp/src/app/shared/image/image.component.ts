import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() backimage;
  @Input() formcolor;
  @Input() formtext;
  @Input() height;
  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
  }

}
