import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../posts.service';
import { Post } from '../post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  postForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  mediaTypes: string[] = ['Instagram', 'Twitter', 'Snapchat', 'WhatsApp'];

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      mediaId: ['', [Validators.required, Validators.minLength(3)]],
      mediaType:['', Validators.required],
      content: ['', Validators.required],
      likes: [0, [Validators.required, Validators.min(0)]],
      mobile: ['', Validators.required],
      bill: ['', Validators.required],
    });
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

      this.postService.createPost(formData).subscribe(response => {
        console.log('Post created:', response);
        this.postForm.reset(); // Reset form after submission
        this.router.navigate(["posts"]);
      });
    }
  }
}
