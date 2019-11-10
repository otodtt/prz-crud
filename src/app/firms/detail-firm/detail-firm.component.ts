import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { MatDialog } from '@angular/material';
// import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';

import { FirebaseService } from '../../services/firebase.service';
import { FirmService } from '../firm.service';

@Component({
  // selector: 'app-details-firm.component',
  templateUrl: './detail-firm.component.html',
  styleUrls: ['./detail-firm.component.css']
})
export class DetailFirmComponent implements OnInit {

  // item: any;
  item: any = [];

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private firmService: FirmService,
    // private fb: FormBuilder,
    private router: Router,
    // public dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.detailsFromFirebase();
    this.detailsFromDB();
  }

  detailsFromFirebase() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        // this.createForm();
        // console.log(Object.keys(this.cyrillic));
        console.log(data);
        console.log(this.item.id);
      }
    });
  }

  detailsFromDB() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.firmService.showFirm(+id)
      .subscribe(
        data => {
          this.item = data;
          console.log(this.item);
        }
      );
  }

}