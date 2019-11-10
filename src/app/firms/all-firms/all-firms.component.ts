import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { map } from 'rxjs/operators';

import { FirebaseService } from '../../services/firebase.service';
import { FirmService } from '../firm.service';
import { Firm } from '../../common/models/Firm';

@Component({
  templateUrl: './all-firms.component.html',
  styleUrls: ['./all-firms.component.scss']
})
export class AllFirmsComponent implements OnInit {

  // items: any;
  items: Firm[];
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
    // this.getAllData();
    this.getAllFirms();
  }

  //// NEW TEST
  getAllFirms () {
    this.apiService.getFirms().subscribe( res => {
      this.items = res;
      // console.log(this.items);
    });
  }
  //// END NEW TEST


  getAllData() {
    this.firebaseService.getAllDataFromTable('manufacturers')
      .subscribe(result => {
        this.items = result;
        // console.log(this.items);
    });
  }

  viewDetails(item: any) {
    // this.router.navigate(['/firms/details/' + item.payload.doc.id]);
    this.router.navigate(['/firms/details/' + item.id]);
  }

  editFirmDetails(item: any) {
    // this.router.navigate(['/firms/edit/' + item.payload.doc.id]);
    this.router.navigate(['/firms/edit/' + item.id]);
  }
}
