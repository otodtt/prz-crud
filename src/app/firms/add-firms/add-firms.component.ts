import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
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

  // firm = new Firm('', '', '', 0, '');
  // firm: Firm[] = [];

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
    public dialog: MatDialog,
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

    this.firmService.addFirm(value)
      .subscribe(
        (res: any) => {
          // Update the list of cars
          this.firms = res;
          console.log(res.id);
          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          this.resetFields();
          this.resetErrors();

          // add to firebase
          this.addFirmToFirebase(value);
        },
        (err) => this.error = err
      );
  }

  addFirmToFirebase(value: any) {

  }

  private resetErrors() {
    this.success = '';
    this.error   = '';
  }

}
