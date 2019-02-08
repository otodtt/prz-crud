import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './all-firms.component.html',
  styleUrls: ['./all-firms.component.scss']
})
export class AllFirmsComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('firms')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          console.log(docArray);
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe( result => {
        console.log(result);
        // for ( const res of result ) {
        //   console.log(res.payload.doc.data());
        // }
    });


  }

}
