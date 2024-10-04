import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ContestPost } from '../contest-post.model';
import { ContestService } from '../../contest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-post-list',
  templateUrl: './contest-post-list.component.html',
  styleUrl: './contest-post-list.component.css',
  providers: [DatePipe]
})
export class ContestPostListComponent {

  @Input() posts: ContestPost[] = []; // Input array of posts
  groupedPosts: { [week: string]: ContestPost[] } = {};
  editingPost: ContestPost | null = null;
  contestId: number | null = null;;
  showConfirmationModal = false;
  contestIdToDelete: number | null = null;
  searchQuery: string = '';
  isSearchOpen = false;

  constructor(private datePipe: DatePipe, private contestService: ContestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.renderUpdatedList();
  }

  renderUpdatedList(){
    debugger
    const idParam = this.route.snapshot.params['id'];
    this.contestId = idParam !== undefined && idParam !== null ? Number(idParam) : null;
    if(this.contestId !== null && !isNaN(this.contestId)){
      this.contestService.getPostsByContestId(this.contestId).subscribe(posts => {
        // Sort posts by timestamp in descending order (most recent first)
        const sortedPosts = posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.groupPostsByDate(sortedPosts);
      });
    }else {
      this.contestService.getAllContestPosts().subscribe(posts => {
        // Sort posts by timestamp in descending order (most recent first)
        const sortedPosts = posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.groupPostsByDate(sortedPosts);
      });
    }
  }
  toggleSearchBar() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  // Filter posts based on search query
filteredPosts(posts: ContestPost[]): ContestPost[] {
  if (!this.searchQuery) {
    return posts;
  }
  
  return posts.filter(post => 
    post.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    post.mediaId.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

groupPostsByDate(posts: ContestPost[]) {
  this.groupedPosts = {};  // Reset grouped posts
  posts.forEach(post => {
    const weekStart = this.getWeekStartDate(new Date(post.timestamp));
    const weekKey = this.datePipe.transform(weekStart, 'yyyy-MM-dd')!; // Format the week start date

    if (!this.groupedPosts[weekKey]) {
      this.groupedPosts[weekKey] = [];
    }
    // Only add posts that match the search query
    if (this.filteredPosts([post]).length > 0) {
      this.groupedPosts[weekKey].push(post);
    }
  });
}

  // Get the start date of the week for a given date
  private getWeekStartDate(date: Date): Date {
    const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - dayOfWeek); // Set to the previous Sunday
    weekStart.setHours(0, 0, 0, 0); // Reset time to midnight
    return weekStart;
  }

  formatTime(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString(); // Format the time as needed
  }

  editPost(post: ContestPost) {
    this.editingPost = post; // Set the post to edit
  }

  deletePost(post: ContestPost) {
    this.contestIdToDelete = post.id;
    this.showConfirmationModal = true;
  }

  onSavePost(updatedPost: ContestPost) {
    // Implement save logic here
    this.onCancelEdit();
    window.location.reload(); // Clear the editing state
  }

  onCancelEdit() {
    this.editingPost = null;
    document.body.classList.remove('modal-open');
  }

  getPostDates(): string[] {
    return Object.keys(this.groupedPosts).filter(date => {
      return this.filteredPosts(this.groupedPosts[date]).length > 0;
    });
  }

  deleteConfirmed(){
    debugger
    if (this.contestIdToDelete !== null) {
      this.contestService.deleteContestPost(this.contestIdToDelete).subscribe(() => {
        this.removeDeletedPostFromUI(this.contestIdToDelete);
        this.cancelDelete(); // Close the confirmation modal
      });
    }
  }
  
  cancelDelete(): void {
    this.showConfirmationModal = false;
    this.contestIdToDelete = null;
  }

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
}
