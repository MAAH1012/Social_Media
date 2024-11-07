import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ContestPost } from '../contest-post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestService } from '../../contest.service';
import { Contest } from '../../contest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-post-edit',
  templateUrl: './contest-post-edit.component.html',
  styleUrl: './contest-post-edit.component.css'
})
export class ContestPostEditComponent {
  @Input() post: ContestPost | null = null;
  @Output() saveContestPost = new EventEmitter<ContestPost>();
  @Output() cancelEdit = new EventEmitter<void>();

  postForm: FormGroup;
  fileError: string | null = null; // To display file upload errors
  selectedFile: File | null = null;
  mediaTypes: string[] = ['Instagram', 'Twitter', 'Snapchat', 'Whatsapp'];
  contests: Contest[] = [];

  constructor(private fb: FormBuilder, private contestPostService: ContestService, private router: Router) {
    this.postForm = this.fb.group({
      mediaId: ['', [Validators.required, Validators.minLength(3)]],
      mediaType:['', Validators.required],
      content: ['', Validators.required],
      contestId: ['', Validators.required],
      likes: [0, [Validators.required, Validators.min(0)]],
      photoUrl: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger
    if (changes['post'] && this.post) {
      this.postForm.patchValue({
        mediaId: this.post.mediaId,
        mediaType: this.post.mediaType,
        content: this.post.content,
        contestId: this.post.contestId,
        likes: this.post.likes,
        photoUrl: this.post.photoUrl
      });
    }
    this.loadContests();
  }

  onSubmit(): void {
    debugger
    if (this.postForm.valid) {
      const formData = new FormData();
      let updatedPost = this.postForm.value;

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      formData.append('body', new Blob([JSON.stringify(updatedPost)], { type: 'application/json' }));

      this.contestPostService.updateContestPost(this.post.id, formData).subscribe(response => {
        debugger
        console.log('Post updated:', response);
        this.onEditComplete(response);
        this.onCancel();
        this.router.navigate(["contest-list"]);
      });
    }
  }

  // Notify parent component when editing is done
  onEditComplete(post: ContestPost) {
    this.saveContestPost.emit(post);
  }
  onCancel(): void {
    this.cancelEdit.emit(); // Emit the cancel event to the parent
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
  loadContests(): void {
    this.contestPostService.getContests().subscribe((contests: Contest[]) => {
      this.contests = contests;
    });
  }
}
