import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnChanges {
  @Input() post: Post | null = null; // Input to receive the post to edit
  @Output() savePost = new EventEmitter<Post>(); // Output to emit the updated post
  @Output() cancelEdit = new EventEmitter<void>(); // Output to signal cancelling the edit

  postForm: FormGroup;
  fileError: string | null = null; // To display file upload errors
  selectedFile: File | null = null; // Store selected file
  mediaTypes: string[] = ['Instagram', 'Twitter', 'Snapchat', 'WhatsApp'];

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {
    this.postForm = this.fb.group({
      mediaId: ['', [Validators.required, Validators.minLength(3)]],
      mediaType:['', Validators.required],
      content: ['', Validators.required],
      likes: [0, [Validators.required, Validators.min(0)]],
      photoUrl: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.postForm.patchValue({
        mediaId: this.post.mediaId,
        mediaType: this.post.mediaType,
        content: this.post.content,
        likes: this.post.likes,
        photoUrl: this.post.photoUrl
      });
    }
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

      this.postService.updatePost(this.post.id, formData).subscribe(response => {
        console.log('Post updated:', response);
        this.onEditComplete(response);
        this.router.navigate(["posts"]);
      });
    }
  }

  // Notify parent component when editing is done
  onEditComplete(post: Post) {
    this.savePost.emit(post);
  }
  onCancel(): void {
    this.cancelEdit.emit(); // Emit the cancel event to the parent
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

}
