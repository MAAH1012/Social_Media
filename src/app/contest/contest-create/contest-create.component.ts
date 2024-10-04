import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContestService } from '../contest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.css']
})
export class ContestCreateComponent implements OnInit {
  contestForm: FormGroup;
  toDateInvalid = false;

  constructor(private fb: FormBuilder, private contestService: ContestService, private router: Router) {}

  ngOnInit(): void {
    this.contestForm = this.fb.group({
      tag: ['', [Validators.required, Validators.minLength(3)]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    debugger
    if (this.contestForm.valid) {
      const newContest = this.contestForm.value;
      
      this.contestService.createContest(newContest).subscribe(
        response => {
          debugger
          console.log('Contest created successfully:', response);
          // Optionally, redirect or show success notification
          this.contestForm.reset();
          this.router.navigate(["contest-list"]);
        },
        error => {
          console.log('Error creating contest:', error);
        }
      );
    }
  }

  // Check if the end date is after the start date
  ngDoCheck(): void {
    const fromDate = new Date(this.contestForm.get('fromDate')?.value);
    const toDate = new Date(this.contestForm.get('toDate')?.value);
    this.toDateInvalid = fromDate >= toDate;
  }
}
