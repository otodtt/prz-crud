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
  // firm: Firm[]  = [];

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

  onSubmit( value: any ) {
    const alphabet = this.fls.getFirstLetterOfName(value.name);

    // console.log(this.firm);
    // const firm_f = this.firm({
    //   name = value.name,
    //   nameToSearch = value.name.toLowerCase(),
    //   country = value.country,
    //   alphabet = alphabet
    // })
    // this.firm.name = value.name;
    // this.resetErrors();
    const firm: Firm[] = [
      {
        name: value.name,
        nameToSearch: value.name.toLowerCase(),
        country: value.country,
        alphabet: alphabet
      }
    ];

    this.firmService.store(firm)
      .subscribe(
        (res: Firm[]) => {
          console.log(this.firms);
          console.log(res);
          // Update the list of cars
          this.firms = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          // value.reset();
        },
        (err) => this.error = err
      );

    // const alphabet = this.fls.getFirstLetterOfName(value.name);
    // this.db.collection('manufacturers').add({
    //   name: value.name,
    //   nameToSearch: value.name.toLowerCase(),
    //   country: value.country,
    //   alphabet: alphabet
    // })
    // .then(
    //   res => {
    //     this.resetFields();
    //     this.router.navigate(['/firms']);
    //   }
    // );
  }

  private resetErrors() {
    this.success = '';
    this.error   = '';
  }

}
