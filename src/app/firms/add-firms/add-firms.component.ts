import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseService } from '../../services/firebase.service';
import { FirstLetterService } from '../../services/first.letter.service';
import { FirmService } from '../firm.service';
import { Firm } from '../../common/models/Firm';


@Component({
  selector: 'app-add-firms',
  templateUrl: './add-firms.component.html',
  styleUrls: ['./add-firms.component.scss']
})
export class AddFirmsComponent implements OnInit {
  firms: Firm[];
  error = '';
  success = '';

  exampleForm: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'country': [
      { type: 'required', message: 'Country is required.' }
    ]
 };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public firebaseService: FirebaseService,
    public fls: FirstLetterService,
    public db: AngularFirestore,
    public firmService: FirmService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      country: ['', Validators.required ]
    });
  }

  resetFields() {
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
  }

  onSubmit(value: any) {
    this.addFirmToDB(value);
  }


  addFirmToDB(value: any) {
    value.alphabet = this.fls.getFirstLetterOfName(value.name);
    value.nameToSearch = value.name.toLowerCase();
    value.isActive = 0;

    this.firmService.addFirm(value)
      .subscribe(
        (res: any) => {
          // Update the list of firms
          this.firms = res;
          // add to firebase
          this.addFirmToFirebase(res);

          // Inform the user
          // this.success = 'Created successfully';
        },
        (err) => this.error = err
      );
  }

  addFirmToFirebase(value: any) {
    this.firebaseService.addFirmToFirebaseManufacturers(value)
      .then(
        res => {
          this.resetFields();
          this.resetErrors();
          this.router.navigate(['/firms/all']);
      }
    );
  }

  private resetErrors() {
    this.success = '';
    this.error   = '';
  }

}
