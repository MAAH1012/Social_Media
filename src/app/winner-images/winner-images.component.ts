import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/posts.service';
import { Post } from '../posts/post.model';

@Component({
  selector: 'app-winner-images',
  templateUrl: './winner-images.component.html',
  styleUrl: './winner-images.component.css'
})
export class WinnerImagesComponent implements OnInit{


  winnerPosts : Post[] =[];
  constructor(private postService: PostService){}
  
  ngOnInit(): void {
    debugger
    this.postService.getWinnerPosts().subscribe(posts => {
      debugger
      this.winnerPosts = posts;
    })
  }
}
