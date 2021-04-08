import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],

})

export class CompanyComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    }

  ngOnInit() {

  }


}
