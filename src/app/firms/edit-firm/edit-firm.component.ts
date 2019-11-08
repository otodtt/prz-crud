import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { FirstLetterService } from '../../services/first.letter.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './edit-firm.component.html',
  styleUrls: ['./edit-firm.component.scss']
})
export class EditFirmComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'country': [
     { type: 'required', message: 'Surname is required.' }
   ]
 };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public fls: FirstLetterService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name.trim(), Validators.required],
      country: [this.item.country.trim(), Validators.required],
    });
  }

  onSubmit(value: any) {
    value.alphabet = this.fls.getFirstLetterOfName(value.name);
    this.firebaseService.updateData(this.item.id, value, 'manufacturers')
    .then(
      res => {
        this.router.navigate(['/firms']);
      }
    );
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
