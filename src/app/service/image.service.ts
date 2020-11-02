import { Injectable } from '@angular/core';
import {AngularFireList, AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageConfirm = true;
  imageDetailList: AngularFireList<any>;
  constructor(private  firebase: AngularFireDatabase, private router: Router) {
    this.imageDetailList = this.firebase.list('/imageDetails');
  }
  getImageDetailList(){
    return this.imageDetailList;
  }
  insertImageDetails(imageDetails){
    if (imageDetails){
      this.imageDetailList.push(imageDetails);
    }
    this.imageConfirm = false;
  }

  deleteImageDetails(key: string): Promise<void> {
    return this.imageDetailList.remove(key);
  }
}
