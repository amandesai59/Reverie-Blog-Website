import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  host: string;

  constructor(private http: HttpClient) {

    this.host = 'https://blog-bmfm.onrender.com';

  }

  getAllBlogs() {

    const url = this.host + '/blogs';

    return this.http.get(url)

  }

  postBlog(blog: any) {
    const url = this.host + '/blogs';

    return this.http.post(url, blog)
  }

  getUser(user: any) {
    
  }

}
