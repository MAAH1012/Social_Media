import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contest } from '../contest/contest.model';
import { ContestService } from '../contest/contest.service';
import { ContestPost } from '../contest/contest-post/contest-post.model';


@Component({
  selector: 'app-contest-display',
  templateUrl: './contest-display.component.html',
  styleUrls: ['./contest-display.component.css']
})
export class ContestDisplayComponent implements OnInit {
  // Property to control the dropdown visibility
  isDropdownOpen = false;
  contestslist: Contest[] = [];
  selectedIcon: string | null = null;
  selectedSymbol: string | null = 'assets/red-heart-icon.svg';
  iconString: string = "Likes";
  selectedContest: Contest = {
    tag: '',
    fromDate: '', // ISO date string (YYYY-MM-DD)
    toDate: '',   // ISO date string (YYYY-MM-DD)
    timestamp: ''
  }
  contestPost: ContestPost ={
    mediaId:'',
    content: '',
    likes: 0,
    photoUrl: '',
    timestamp: '',
    mediaType: '',
    contestId:0
  }

  // Sample list of contests (could be fetched from an API)
  contests = [
    { id: 1, tag: 'Selfie with Nature' },
    { id: 2, tag: 'Post of the Day' },
    { id: 3, tag: 'Best Food Picture' }
  ];

  // The selected post for a given contest
  selectedPost: any = null;

  constructor(private http: HttpClient, private contestService: ContestService) {}
  ngOnInit(): void {
    this.loadContests();
  }

  // Toggle the visibility of the dropdown
  toggleDropdown() {
    debugger
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectContest(contest: Contest) {
    debugger
    // Logic to handle the selected contest
    console.log(`Selected Contest: ${contest.tag}`);
    
    this.isDropdownOpen = false;
    this.selectedContest = contest;
    this.contestService.getTopPostbyContestId(contest).subscribe(post =>{
      this.contestPost = post;
      this.selectIcon(post.mediaType);
    })
  }
  loadContests(): void {
    debugger
    this.contestService.getContests().subscribe((contests: Contest[]) => {
      debugger
      this.contestslist = contests;
      this.selectContest(this.contestslist[0]);
    });
  }

  selectIcon(platform: string) {
    const iconMap: { [key: string]: string } = {
      Instagram: 'assets/instagram.svg',
      Twitter: 'assets/twitter.svg',
      Snapchat: 'assets/snapchat.svg',
      Whatsapp: 'assets/whatsapp.svg',
    };
    const sybolMap: { [key: string]: string } = {
      Instagram: 'assets/red-heart-icon.svg',
      Twitter: 'assets/blue-heart.svg',
      Snapchat: 'assets/fire.svg',
      Whatsapp: 'assets/eye.svg',
    };

    const stringMap: { [key: string]: string } = {
      Instagram: 'Likes',
      Twitter: 'Retweets',
      Snapchat: 'Streaks',
      Whatsapp: 'Views',
    };

    const platformClassMap: { [key: string]: string } = {
      Instagram: 'instagram',
      Twitter: 'twitter',
      Snapchat: 'snapchat',
      Whatsapp: 'whatsapp',
    };
    this.selectedIcon = iconMap[platform];
    this.selectedSymbol = sybolMap[platform];
    this.iconString = stringMap[platform];
    console.log(`Selected platform: ${platform}`);
  }
}
