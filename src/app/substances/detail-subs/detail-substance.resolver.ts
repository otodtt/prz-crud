import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class DetailSubstanceResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const subsId = route.paramMap.get('id');
      this.firebaseService.getDataFromFirebaseTable(subsId, 'substances')
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
