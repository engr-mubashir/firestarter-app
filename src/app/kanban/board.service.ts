import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Board, Task } from './board.model';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private collectionName = 'boards';
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  /*
  Create board item for the current user
   */
  async createBoard(data: Board) {
    const user = await this.angularFireAuth.currentUser;
    return this.angularFirestore.collection(this.collectionName).add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'default', label: 'green' }],
    });
  }

  /*
  Delete board item
   */
  deleteBoard(boardId: string) {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(boardId)
      .delete();
  }

  /*
  Update board tasks the current user
   */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(boardId)
      .update({ tasks });
  }

  /*
  Deep check - remove a specific task from task list
   */
  removeTask(boardId: string, task: Task) {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }

  /*
  Get all boards of the current user
   */
  getUserBoards() {
    return this.angularFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.angularFirestore
            .collection<Board>(this.collectionName, (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /*
  Run a batch write to change the priority of each board item, aka transactions
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((board) =>
      db.collection(this.collectionName).doc(board.id)
    );
    refs.forEach((ref, index) => batch.update(ref, { priority: index }));
    batch.commit();
  }
}
