import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { AbstractCommonService } from '../auth/common.abstract.service';


@Injectable({
  providedIn: 'root'
})
export class PostService extends AbstractCommonService{

  constructor(http: HttpClient) {
    super(http);
  }

  getPosts(): Observable<Post[]> {
    debugger
    return this.http.get<Post[]>(this.fullUrl + "postslist", {headers: this.httpHeaders});
  }

  getTopPost(): Observable<Post> {
    debugger
    return this.http.get<Post>(this.fullUrl + "top", {headers: this.httpHeaders});
  }

  createPost(file: FormData): Observable<void> {
    debugger
    return this.http.post<void>(this.fullUrl + "createpost", file, {headers: this.httpHeadersForMultiparts});
  }

  updatePost(id: number, formData: FormData): Observable<Post> {
    debugger
    return this.http.put<Post>(this.fullUrl + "postedit/" + id, formData,{headers: this.httpHeadersForMultiparts});
  }

  deletePost(id: number): Observable<void> {
    debugger
    return this.http.delete<void>(this.fullUrl + "deletepost/" + id, {headers: this.httpHeaders});
  }

  declareWinner(file: FormData){
    debugger
    return this.http.post<void>(this.fullUrl + "winpost", file, {headers: this.httpHeadersForMultiparts});
  }
}
