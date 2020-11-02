import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {ImageService} from '../../service/image.service';
import {Image} from '../Image';
import {Router} from '@angular/router';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Output()
  getLinkFather: EventEmitter<string> = new EventEmitter<string>();
  imageList: any[];
  imgSrc = 'assets/images/banners/300.png';
  loading = false;
  editImage: Image = {
    key: null,
    name: '',
    imageUrl: '',
    category: '',
    caption: ''
  };
  confirm = true;
  dateImage: number;
  selectedImage: any = null;
  constructor(private storage: AngularFireStorage, private service: ImageService, private router: Router) { }

  ngOnInit(): void {
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
        console.log('hello'+e.target.result);
      }

      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage);
    }else{
      this.imgSrc = 'assets/images/banners/300.png';
      this.selectedImage = null;
    }
  }

  changeCaption(value) {
    this.editImage.caption = value;
  }

  changeCategory(value) {
    this.editImage.category = value;
  }

  addNewImage() {
    this.loading = true;
    this.dateImage = new Date().getTime();
    this.editImage.name=`${this.dateImage}`;
    const filePath = `${this.editImage.category}/${this.selectedImage.name}_${this.dateImage}`;
    const fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.editImage.imageUrl = url
            // add image to database
            this.service.insertImageDetails(this.editImage);
            this.confirm = this.service.imageConfirm;
            this.loading = false;
            alert("Upload Completed");
          });
        })
    ).subscribe();


  }
  addImageList(){

    this.service.getImageDetailList().snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => {
            return item.payload.val();
          });

          this.showList();
        }
    );

  }
  getLink() {

    this.addImageList();
  }
  showList(){
    let a = '';
    const contain = document.getElementById("contain");
    for(let image of this.imageList){
      if(this.editImage.name===image.name){
        a = image.imageUrl;
      }
    }
    this.getLinkFather.emit(a);
    const selBox = document.createElement('textarea');
    selBox.style.opacity="1";
    selBox.rows = 3;
    selBox.setAttribute("class","form-control rounded-0 mt-2");
    selBox.value = a;
    contain.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    contain.removeChild(selBox);
  }


}
