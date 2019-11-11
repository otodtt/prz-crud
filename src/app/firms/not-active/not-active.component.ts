import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';
import { FirmService } from '../firm.service';
import { Firm } from '../../common/models/Firm';

@Component({
  templateUrl: './not-active.component.html',
  styleUrls: ['./not-active.component.scss']
})
export class NotActiveComponent implements OnInit {

  // items: Firm[];
  items: any;
  nameTable: 'manufacturers';
  firms: Firm[];
  error = '';
  success = '';

  constructor(
    private router: Router,
    public firebaseService: FirebaseService,
    public apiService: FirmService,
    // private db: AngularFirestore,
  ) { }


  ngOnInit() {
    this.getNotActiveFromFirebase();
    // this.getAllFirmsDB();
  }

  getNotActiveFromFirebase() {
    this.firebaseService.getNotActiveFromFirebaseTable('manufacturers')
      .subscribe(result => {
        this.items = result;
        // console.log(this.items);
    });
  }

  // //// NEW TEST
  // getAllFirmsDB () {
  //   this.apiService.getFirms().subscribe( res => {
  //     this.items = res;
  //     // console.log(res);
  //   });
  // }
  // //// END NEW TEST

  // getAllFromFirebase() {
  //   this.firebaseService.getAllDataFromFirebaseTable('manufacturers')
  //     .subscribe(result => {
  //       this.items = result;
  //       // console.log(this.items);
  //   });
  // }

  viewDetails(item: any) {
    this.router.navigate(['/firms/details/' + item.payload.doc.id]);
    // this.router.navigate(['/firms/details/' + item.id]);
  }

  editFirmDetails(item: any) {
    this.router.navigate(['/firms/edit/' + item.payload.doc.id]);
    // this.router.navigate(['/firms/edit/' + item.id]);
  }

}
