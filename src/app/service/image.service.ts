import { Injectable } from '@angular/core';
import {AngularFireList, AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageConfirm = true;
  imageDetailList: AngularFireList<any>;
  constructor(private  firebase: AngularFireDatabase, private router: Router) { }
  getImageDetailList(){
    this.imageDetailList = this.firebase.list('/imageDetails');
    return this.imageDetailList;
  }
  insertImageDetails(imageDetails){
    this.imageDetailList = this.firebase.list('/imageDetails');
    if (imageDetails){
      this.imageDetailList.push(imageDetails);
    }
    this.imageConfirm = false;
  }
  deleteImageDetails(imageDetails){
    this.firebase.object('/imageDetails/' + imageDetails).remove();
  }
}
