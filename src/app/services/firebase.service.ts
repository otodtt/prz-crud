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
    return this.db.collection('userTest').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('userTest').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('userTest').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('userTest').snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('userTest', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('userTest', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar) {
    return this.db.collection('userTest').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age, 100),
      avatar: avatar
    });
  }

  // МОИ
  // getAllDataFromFirebaseTable(nameTable: string) {
  //   return this.db.collection(nameTable).snapshotChanges();
  // }


  /** тази функция да се ползва за продукшъна */
  // getAllDataFromFirebaseTable(nameTable: string) {
  //   return this.db.collection(nameTable, ref => ref.orderBy('db_id', 'asc').where('isActive', '==', 0)
  //     .where('isActive', '==', 0 ))
  //     .snapshotChanges();
  // }

  getAllDataFromFirebaseTable(nameTable: string) {
    return this.db.collection(nameTable, ref => ref.orderBy('db_id', 'asc'))
      .snapshotChanges();
  }

  getDataFromFirebaseTable(userKey: any, nameTable: string) {
    return this.db.collection(nameTable).doc(userKey).snapshotChanges();
  }

  updateFirebaseData(userKey: any, value: any, tableName: string) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection(tableName).doc(userKey).set(value);
  }

  getNotActiveFromFirebaseTable(nameTable: string) {
    return this.db.collection(nameTable, ref => ref.where('isActive', '>=', 1 ))
    .snapshotChanges();
  }

  addFirmToFirebaseManufacturers(value: any) {
    return this.db.collection('manufacturers').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      country: value.country,
      alphabet: value.alphabet,
      isActive: 0,
      db_id: value.id,
    });
  }


  getProductsForFirm(userKey: any, nameTable: string) {
    return this.db.collection(nameTable, ref => ref
    .where('isActive', '==', 0 )
    .where('manufacturersId', '==', userKey ))
    .snapshotChanges();
  }
}
