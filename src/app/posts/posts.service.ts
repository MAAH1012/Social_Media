import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  getSlidshowPics(fromDate: string, toDate: string): Observable<Post[]> {
    debugger
    let params = new HttpParams();
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    return this.http.get<Post[]>(this.fullUrl + "getslideshowpics", {headers: this.httpHeaders, params: params});
  }
  getWinnerPosts(){
    debugger
    return this.http.get<Post[]>(this.fullUrl + "getwinnerposts", {headers: this.httpHeaders});
  }

  getTopInstP(): Observable<Post>{
    return this.http.get<Post>(this.fullUrl + "insttp", {headers: this.httpHeaders});
  }

  getTopSnapP(): Observable<Post>{
    return this.http.get<Post>(this.fullUrl + "snaptp", {headers: this.httpHeaders});
  }
  getTopWhatP(): Observable<Post>{
    return this.http.get<Post>(this.fullUrl + "whatstp", {headers: this.httpHeaders});
  }
  getTopTwitP(): Observable<Post>{
    return this.http.get<Post>(this.fullUrl + "twittp", {headers: this.httpHeaders});
  }
}
