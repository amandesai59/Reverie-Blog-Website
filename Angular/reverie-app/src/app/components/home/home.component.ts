import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/services/Blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allBlogs: any;

  constructor(private blogSerive: BlogService) { }

  ngOnInit() {

    this.blogSerive.getAllBlogs().subscribe({
      next: (response) => {
        this.allBlogs = response;
      },
      error: (error) => {}
    })

  }

}


