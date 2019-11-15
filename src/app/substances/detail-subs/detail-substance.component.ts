import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { FirebaseService } from '../../services/firebase.service';
import { SubstanceService } from '../substance.service';

@Component({
  templateUrl: './detail-substance.component.html',
  styleUrls: ['./detail-substance.component.scss']
})
export class DetailSubstanceComponent implements OnInit {

  // item: any;
  item: any = [];
  products: any = [];

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private substanceService: SubstanceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.detailsFromFirebase();
    // this.detailsFromDB();

    this.getProductsForThisFirm();
  }

  detailsFromFirebase() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        // this.createForm();
        // console.log(Object.keys(this.cyrillic));

        // console.log(data);
        // console.log(this.item.id);
      }
    });
  }

  detailsFromDB() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.substanceService.showSubstance(+id)
      .subscribe(
        data => {
          this.item = data;
          // console.log(this.item);
        }
      );
  }

  getProductsForThisFirm() {
    // console.log(this.item);
    this.firebaseService.getProductsForFirm(this.item.db_id, 'acaricides')
        .subscribe( res => {
          this.products = res;
          // console.log(res);
        });

  }

}
