import { Component, OnInit, Input } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() links: KeyValue<string, string>[];
  @Input() navbackcolor: string;
  @Input() buttoncolor: string;
  goBack;
  constructor(private active: ActivatedRoute) {
  }

  el: HTMLElement;
  ngOnInit() {
    this.goBack = this.active.snapshot.url.shift().path;
    const route = this.active.snapshot.url.pop().path;
    if (route === 'admin') {
      const admin = document.getElementById('admin');
      admin.style.display = 'block';
    }
  }

  scroll(id) {
    this.el = document.getElementById(id);
    const headerHeight = document.getElementsByTagName('nav')[0].clientHeight;
    window.scrollTo(0, this.el.offsetTop - headerHeight);
    return false;
  }

  return() {
    if (this.goBack === 'departments') {
     window.location.href = '/company/0';
    } else {
     window.location.href = '/';
    }
  }

}
