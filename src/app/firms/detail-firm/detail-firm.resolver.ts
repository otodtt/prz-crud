import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class DetailFirmResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const firmId = route.paramMap.get('id');
      this.firebaseService.getDataFromTable(firmId, 'manufacturers')
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
