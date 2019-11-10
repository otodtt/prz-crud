import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars() {
      return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar) {
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age, 100),
      avatar: avatar
    });
  }

  // МОИ
  getAllDataFromFirebaseTable(nameTable: string) {
    return this.db.collection(nameTable).snapshotChanges();
  }

  getDataFromFirebaseTable(userKey: any, nameTable: string) {
    return this.db.collection(nameTable).doc(userKey).snapshotChanges();
  }

  updateFirebaseData(userKey: any, value: any, tableName: string) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection(tableName).doc(userKey).set(value);
  }

  createData( value: any, tableName: string) {
    return this.db.collection(tableName).add(value);
    // return this.db.collection(tableName).add({
    //   name: value.name,
    //   nameToSearch: value.name.toLowerCase(),
    //   country: value.surname,
    //   age: parseInt(value.age, 100),
    // });
  }
}
