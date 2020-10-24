import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../service/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  imageList: any[];
  imageListCate: any = [];
  // rowIndexArray: any[];
  constructor(private service: ImageService) { }

  ngOnInit(): void {
    this.service.getImageDetailList().snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => {
            return item.payload.val();
          });

          // this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
          console.log(this.imageListCate);
        }
    );

  }

  deleteImage(image) {
    console.log(image);
    this.service.deleteImageDetails(image);
  }
}
