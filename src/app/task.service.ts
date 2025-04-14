
import { inject, Injectable, signal } from '@angular/core';
// make sure you are importing the below from @angular/fire/firestore and not firebase/firestore
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { collectionData, docData } from '@angular/fire/firestore';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})


export class TaskService {

    private firestore = inject(Firestore);
    private taskCollection = collection(this.firestore, 'tasks');

    tasks = signal<Task[]>([]); // Array to store tasks for the selected user

  constructor() { }

  addTask(userId: string, task: Task) {
    const taskRef = doc(this.taskCollection);
    const taskId = taskRef.id;
    task.taskId = taskId;
    task.userId = userId;
    setDoc(taskRef, task);
  }

  getTasksByUserId(userId: string) {
    const taskQuery = query(this.taskCollection, where('userId', '==', userId));
    return collectionData(taskQuery, { idField: 'taskId' }) as Observable<Task[]>;
  }

  deleteTasksByUserId(userId: string) {
    const taskQuery = query(this.taskCollection, where('userId', '==', userId));
    const querySnapshot = collectionData(taskQuery, { idField: 'taskId' }) as Observable<Task[]>;
    querySnapshot.subscribe((tasks) => {
      tasks.forEach((task) => {
        const taskDoc = doc(this.taskCollection, task.taskId);
        deleteDoc(taskDoc);
      });
    } );  

  }

  deleteTask(userId: string, taskId: string) {
    // const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
    // return deleteDoc(taskDoc);
    const taskQuery = query(this.taskCollection, where('userId', '==', userId));
    const taskDoc = doc(this.taskCollection, taskId);
    return deleteDoc(taskDoc);
  }
  updateTask(userId: string, taskId: string, updatedTask: Partial<Task>) {
    const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
    return updateDoc(taskDoc, updatedTask);
  }
  getTaskById(userId: string, taskId: string) {
    const taskDoc = doc(this.firestore, `users/${userId}/tasks/${taskId}`);
    return docData(taskDoc, { idField: 'taskId' }) as Observable<Task>;
  }


}
