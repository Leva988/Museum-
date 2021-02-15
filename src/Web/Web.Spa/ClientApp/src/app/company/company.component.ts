import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],

})

export class CompanyComponent implements OnInit {
id;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    if (this.id !== '0') {
      window.location.href = '/notfound';
    }
  }

  ngOnInit() {

  }


}
