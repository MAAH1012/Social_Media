import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../../posts/posts.service';
import { ContestService } from '../../contest.service';
import { Contest } from '../../contest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-post-create',
  templateUrl: './contest-post-create.component.html',
  styleUrl: './contest-post-create.component.css'
})
export class ContestPostCreateComponent {

  postForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  mediaTypes: string[] = ['Instagram', 'Twitter', 'Snapchat', 'WhatsApp'];
  contests: Contest[] = [];

  constructor(private fb: FormBuilder, private contestService: ContestService, private router: Router) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      mediaId: ['', [Validators.required, Validators.minLength(3)]],
      mediaType:['', Validators.required],
      content: ['', Validators.required],
      contestId: ['', Validators.required],
      likes: [0, [Validators.required, Validators.min(0)]],
    });
    this.loadContests();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'image/jpeg') {
        this.selectedFile = file;
        this.fileError = null;
      } else {
        this.fileError = 'Please select a JPG file.';
        this.selectedFile = null;
      }
    }
  }

  onSubmit(): void {
    debugger
    if (this.postForm.valid && this.selectedFile) {
      const formData = new FormData();
      let body = this.postForm.value
      formData.append('file', this.selectedFile);
      formData.append('body', new Blob([JSON.stringify(body)], {type: 'image/jpeg'}));

      this.contestService.createPost(formData).subscribe(response => {
        console.log('Post created:', response);
        this.postForm.reset();
        this.router.navigate(["contest-list"]);
      });
    }
  }
  loadContests(): void {
    this.contestService.getContests().subscribe((contests: Contest[]) => {
      this.contests = contests;
    });
  }
}
