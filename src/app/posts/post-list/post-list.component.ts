import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  
  groupedPosts: { [day: string]: Post[] } = {}; // Object to store posts grouped by day
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  searchQuery: string = '';
  editingPost: Post | null = null;
  showDropdown = true;
  declareWinnerForm: FormGroup;
  winnerPost: Post;
  selectedFile: File | null = null;
  fileError: string | null = null;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.declareWinnerForm = this.fb.group({
      winnerDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.renderUpdatedList();
  }

  renderUpdatedList(){
    this.postService.getPosts().subscribe(posts => {
      // Sort posts by timestamp in descending order (most recent first)
      const sortedPosts = posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      this.groupPostsByDate(sortedPosts);
    });
  }
  groupPostsByDate(posts: Post[]): void {
    this.groupedPosts = {}; // Reset grouped posts
    posts.forEach(post => {
      const postDate = new Date(post.timestamp).toDateString(); // Group by date (e.g., 'Mon Sep 13 2024')
      if (!this.groupedPosts[postDate]) {
        this.groupedPosts[postDate] = [];
      }
      this.groupedPosts[postDate].push(post);
    });
  }

  getFilteredPostsByDate(date: string): Post[] {
    debugger
    if (!this.searchQuery.trim()) {
      return this.groupedPosts[date] || [];
    }
    return (this.groupedPosts[date] || []).filter((post) =>
      post.mediaId.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Format the time for each post
  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Method to trigger editing a post
  editPost(post: Post): void {
    this.editingPost = post;
    document.body.classList.add('modal-open'); // Prevent scroll on body when modal is open
  }

  // Method to handle post deletion
deletePost(post: any): void {
  post.showMenu = false;
  // Call the method to delete the post from the server
  this.deletePostFromServer(post.id);
}

deletePostFromServer(postId: number): void {
  this.postService.deletePost(postId).subscribe(
    response => {
      console.log('Post deleted successfully:', response);
      // After successful deletion, update the post list in the UI
      this.removeDeletedPostFromUI(postId);
    },
    error => {
      console.log('Error deleting post:', error);
    }
  );
}

// Method to remove the deleted post from the UI
removeDeletedPostFromUI(postId: number): void {
  // Loop through groupedPosts and find the post to delete
  for (const date in this.groupedPosts) {
    if (this.groupedPosts.hasOwnProperty(date)) {
      const postIndex = this.groupedPosts[date].findIndex(post => post.id === postId);
      
      if (postIndex !== -1) {
        // Remove the post from the array
        this.groupedPosts[date].splice(postIndex, 1);

        // If the array becomes empty after deletion, remove the date from groupedPosts
        if (this.groupedPosts[date].length === 0) {
          delete this.groupedPosts[date];
        }

        break; // Exit the loop once the post is found and deleted
      }
    }
  }
}


  onSavePost(updatedPost: Post) {
    debugger
    // // Find the day of the updated post
    // const day = this.getDayForPost(updatedPost);
  
    // // Find the index of the post in the group for that day
    // const postIndex = this.groupedPosts[day].findIndex(p => p.id === updatedPost.id);
  
    // if (postIndex !== -1) {
    //   // Update the post at the correct index
    //   this.groupedPosts[day][postIndex] = updatedPost;
    // }
  
    // // Close the modal after saving
    this.onCancelEdit();
    window.location.reload();
  }
  
  getPostDates(): string[] {
    return Object.keys(this.groupedPosts);
  }

  // private getDayForPost(post: Post): string {
  //   debugger
  //   const postDate = new Date(post.timestamp); // Assuming post.timestamp is in a valid date format
  //   const dayIndex = postDate.getDate(); // getDay() returns 0 for Sunday, 1 for Monday, etc.
    
  //   // Assuming you have a daysOfWeek array like ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  //   return this.daysOfWeek[dayIndex] || '';
  // }

  onCancelEdit(): void {
    this.editingPost = null;
    document.body.classList.remove('modal-open'); // Restore scroll on body
  }

  declareWinner(post: any) {
    this.winnerPost = post;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      this.fileError = null;
      this.selectedFile = file;
    } else {
      this.fileError = 'Only JPG files are allowed.';
      this.selectedFile = null;
    }
  }

  closeWinnerModal() {
    this.winnerPost = null;
    this.declareWinnerForm.reset();
  }
}
