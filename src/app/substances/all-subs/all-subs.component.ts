import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';
import { SubstanceService } from '../substance.service';
import { Substance } from '../../common/models/Substance';

@Component({
  templateUrl: './all-subs.component.html',
  styleUrls: ['./all-subs.component.css']
})
export class AllSubsComponent implements OnInit {

  items: any;
  // items: Firm[];
  nameTable: 'substances';
  firms: Substance[];
  error = '';
  success = '';

  constructor(
    private router: Router,
    public firebaseService: FirebaseService,
    public apiService: SubstanceService,
    // private db: AngularFirestore,
  ) { }


  ngOnInit() {
    this.getAllFromFirebase();
    // this.getAllFirmsDB();
  }

  //// NEW TEST
  getAllFirmsDB () {
    this.apiService.getSubstances().subscribe( res => {
      this.items = res;
      // console.log(res);
    });
  }
  //// END NEW TEST

  getAllFromFirebase() {
    this.firebaseService.getAllDataFromFirebaseTable('substances')
      .subscribe(result => {
        this.items = result;
        // console.log(this.items);
    });
  }

  viewDetails(item: any) {
    this.router.navigate(['/substances/details/' + item.payload.doc.id]);
    // this.router.navigate(['/substances/details/' + item.id]);
  }

  editFirmDetails(item: any) {
    this.router.navigate(['/substances/edit/' + item.payload.doc.id]);
    // this.router.navigate(['/substances/edit/' + item.id]);
  }

}
