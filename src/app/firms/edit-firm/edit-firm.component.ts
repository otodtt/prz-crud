import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


import { FirebaseService } from '../../services/firebase.service';
import { FirstLetterService } from '../../services/first.letter.service';
import { FirmService } from '../firm.service';

@Component({
  templateUrl: './edit-firm.component.html',
  styleUrls: ['./edit-firm.component.scss']
})
export class EditFirmComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  // item: any = [];

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'country': [
     { type: 'required', message: 'country is required.' }
   ]
 };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private firmService: FirmService,
    public fls: FirstLetterService
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
        this.createForm();
        // console.log(this.item);
      }
    });
  }
  // NEW FROM BD
  detailsFromDB() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.firmService.showFirm(+id)
      .subscribe(
        data => {
          this.item = data;
          this.createForm();
          // console.log(this.item);
        }
      );
  }
  // END NEW FROM BD

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name.trim(), Validators.required],
      country: [this.item.country.trim(), Validators.required],
    });
  }

  onSubmit(value: any) {
     // ОТ FIREBASE
    // value.alphabet = this.fls.getFirstLetterOfName(value.name);
    // this.firebaseService.updateData(this.item.id, value, 'manufacturers')
    // .then(
    //   res => {
    //     this.router.navigate(['/firms']);
    //   }
    // );


    value.alphabet = this.fls.getFirstLetterOfName(value.name);
    value.nameToSearch = value.name.toLowerCase();
    this.firmService.updateFirm(this.item.id, value).subscribe(res => {
      // console.log(res);
      this.router.navigate(['/firms/all']);
    });
  }

  delete() {
    // this.firebaseService.deleteUser(this.item.id)
    // .then(
    //   res => {
    //     this.router.navigate(['/home']);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  cancel() {
    this.router.navigate(['/home']);
  }


}
