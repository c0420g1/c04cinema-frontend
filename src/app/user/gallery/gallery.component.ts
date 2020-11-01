import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../service/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  imageListData: any[];
  imageListKey: string[];

  item: {
    key: string,
    data: {
      caption: '',
      imageUrl: '',
      name: '',
      category: ''
    }
  }
  imageList = [];
  constructor(private service: ImageService) { }

  ngOnInit(): void {

    this.service.getImageDetailList().snapshotChanges().subscribe(
        list => {
          this.imageListData = list.map(item => {
            return item.payload.val();
          });
          this.imageListKey = list.map(item => {
            return item.payload.key;
          });

          for(let i=0;i<this.imageListKey.length;i++){
            this.item = {
              key: this.imageListKey[i],
              data: this.imageListData[i]
            }

            // @ts-ignore
            if(this.item.data.category == "Gallery"){
            this.imageList.push(this.item);
            }

          }
          console.log(this.imageList);

        }
    );

  }

  deleteImage(image) {
    console.log(image.key);
    // let key=image.key;
    this.service.deleteImageDetails(image.key);
  }


}
