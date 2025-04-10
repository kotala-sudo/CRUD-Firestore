import { inject, Injectable} from '@angular/core';
import { User } from './user.model';
import { Observable} from 'rxjs';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  docData,
  CollectionReference,
  query,
  where
} from '@angular/fire/firestore';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private firestore = inject(Firestore);
  private collection: CollectionReference = collection(this.firestore, 'users');


  getUsers(): Observable<User[]> {
    return collectionData(this.collection, { idField: 'id' }) as Observable<User[]>;
  }


  addUser(newUser: User){
    addDoc(this.collection, newUser);
  }

  // 🔍 Optional: Get single user by ID (real-time)
  getUserById(id: string): Observable<User> {
    const userDoc = doc(this.firestore, `users/${id}`);
    return docData(userDoc, { idField: 'id' }) as Observable<User>;
  }

  getUserByName(name: string): Observable<User[]>{
    const userQuery = query(this.collection, where('name', '==', name)) ;
    return collectionData(userQuery, {idField:'id'}) as Observable<User[]>;

  }

  // async deleteUser(id:string): Promise<void>{
  //   const userRef = doc(this.firestore, `users/${id}`);
  //   await deleteDoc(userRef);
  // }

    deleteUser(id:string){
    const userRef = doc(this.firestore, `users/${id}`);
    deleteDoc(userRef);
  }

  updateUser(id:string, editUser: Partial<User>){
    const userRef = doc(this.firestore, `users/${id}`);
    updateDoc(userRef, editUser);
  }

}
