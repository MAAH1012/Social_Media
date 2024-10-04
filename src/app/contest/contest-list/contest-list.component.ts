import { Component, OnInit } from '@angular/core';
import { ContestService } from '../contest.service';
import { Contest } from '../contest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css']
})
export class ContestListComponent implements OnInit {

  contests: Contest[] = [];
  editingContest: Contest | null = null;
  showConfirmationModal = false;
  contestIdToDelete: number | null = null;
  searchQuery: string = '';
  filteredContests: any[] = [];

  constructor(private contestService: ContestService, private router: Router) {}

  ngOnInit(): void {
    this.loadContests();
  }
  filterContests() {
    if (this.searchQuery.trim()) {
      this.filteredContests = this.contests.filter(contest =>
        contest.tag.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredContests = this.contests;
    }
  }

  loadContests(): void {
    this.contestService.getContests().subscribe(contests => {
      debugger
      this.contests = contests;
      this.filterContests();
    });
  }

  editContest(contest: Contest): void {
    debugger
    this.editingContest = { ...contest };
    document.body.classList.add('modal-open');
  }

  deleteContest(contestId: number): void {
    this.contestIdToDelete = contestId;
    this.showConfirmationModal = true;
  }

  navigateToPosts(contestId: number): void {
    this.router.navigate([`/contest/${contestId}/posts`]); // Navigate to contest-post-list
  }
  navigateToPostList(){
    const contestId = null;
    this.router.navigate([`/contest/${contestId}/posts`])
  }

  onCancelEdit(): void {
    this.editingContest = null;
    document.body.classList.remove('modal-open'); // Restore scroll on body
  }

  onSaveContest(contest: Contest){
    this.editingContest = null;
    this.loadContests(); // Reload the contests to reflect the changes
    document.body.classList.remove('modal-open');
  }

  deleteConfirmed(): void {
    debugger
    if (this.contestIdToDelete !== null) {
      this.contestService.deleteContest(this.contestIdToDelete).subscribe(() => {
        this.loadContests(); // Reload the list after deletion
        this.cancelDelete(); // Close the confirmation modal
      });
    }
  }
  cancelDelete(): void {
    this.showConfirmationModal = false;
    this.contestIdToDelete = null;
  }
}
