import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contest } from './contest.model'; // Import the Contest model
import { AbstractCommonService } from '../auth/common.abstract.service';
import { ContestPost } from './contest-post/contest-post.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService extends AbstractCommonService{

  private apiUrl = 'http://localhost:8080/api/contests'; // Replace with your backend API endpoint
  
  constructor(http: HttpClient) {
    super(http);
  }
  
  // Create a new contest
  createContest(contest: Contest): Observable<Contest> {
    debugger
    return this.http.post<Contest>(this.fullUrl + "contestcreate", contest, {headers: this.httpHeaders});
  }
  
  // Get all contests
  getContests(): Observable<Contest[]> {
    debugger
    return this.http.get<Contest[]>(this.fullUrl + "contestlist", {headers: this.httpHeaders});
  }
  
  // Get contest by ID
  getContestById(id: number): Observable<Contest> {
    return this.http.get<Contest>(`${this.apiUrl}/${id}`);
  }
  
  // Update an existing contest
  updateContest(id: number, contest: Contest): Observable<Contest> {
    debugger
    return this.http.put<Contest>(this.fullUrl + "updatecontest/" + id, contest, {headers: this.httpHeaders});
  }
  
  // Delete a contest
  deleteContest(id: number): Observable<void> {
    debugger
    return this.http.delete<void>(this.fullUrl + "deletecontest/" + id, {headers: this.httpHeaders});
  }
  
  createPost(file: FormData): Observable<void> {
    debugger
    return this.http.post<void>(this.fullUrl + "contestpost", file, {headers: this.httpHeadersForMultiparts});
  }
  
  getPostsByContestId(contestId: number): Observable<ContestPost[]>{
    debugger
    return this.http.get<ContestPost[]>(this.fullUrl + "getcontestposts/" + contestId, {headers: this.httpHeaders})
  }
  updateContestPost(id: number, formData: FormData) : Observable<ContestPost> {
    debugger
    return this.http.put<ContestPost>(this.fullUrl + "contestpostedit/" + id, formData,{headers: this.httpHeadersForMultiparts});
  }
  deleteContestPost(id: number) {
    debugger
    return this.http.delete<void>(this.fullUrl + "deletecontestpost/" + id, {headers: this.httpHeaders});
  }

  getAllContestPosts(): Observable<ContestPost[]>{
    debugger
    return this.http.get<ContestPost[]>(this.fullUrl + "allcontestposts", {headers: this.httpHeaders});
  }

  getTopPostbyContestId(contest: Contest) {
    return this.http.get<ContestPost>(this.fullUrl + "topcp/" + contest.id, {headers: this.httpHeaders});
  }
}
