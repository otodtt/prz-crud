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
    this.getAllData();
  }

  getAllData() {
    this.firebaseService.getAllDataFromTable('manufacturers')
    .subscribe(result => {
      this.items = result;
    });

    // this.apiService.getAll().subscribe(
    //   (res: Firm[]) => {
    //     this.firms = res;
    //     console.log(res);
    //   },
    //   (err) => {
    //     this.error = err;
    //     console.log(err);
    //   }
    // );
  }

  viewDetails(item: any) {
    this.router.navigate(['/firms/details/' + item.payload.doc.id]);
  }

  editFirmDetails(item: any) {
    this.router.navigate(['/firms/edit/' + item.payload.doc.id]);
  }
}
