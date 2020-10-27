import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from 'src/app/model/Movie';

@Component({
  selector: 'app-movie-coming',
  templateUrl: './movie-coming.component.html',
  styleUrls: ['./movie-coming.component.css']
})
export class MovieComingComponent implements OnInit {
  movies: Movie[] = [];
  public loading = false;

  constructor(private moviesService: MovieService) {
  }

  ngOnInit(): void {
    this.loading = true;
    const dateCur = new Date().getTime();
    console.log(dateCur);
    this.moviesService.getAll().subscribe(
        (data) => {
          for (let i = 0; i < data.length; i++) {
            const dateP = new Date(data[i].startDate);
            if (dateCur - dateP.getTime() < 1) {
              this.movies.push(data[i]);
            }
          }
          this.loading = false;
        }
    );

  }


  showAlert() {
     alert("Loading !")
  }
}
