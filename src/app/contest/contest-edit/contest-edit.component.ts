import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contest } from '../contest.model';
import { ContestService } from '../contest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-edit',
  templateUrl: './contest-edit.component.html',
  styleUrls: ['./contest-edit.component.css'],
})
export class ContestEditComponent implements OnChanges {
  @Input() contest: Contest | null = null; // The contest to edit
  @Output() saveContest = new EventEmitter<Contest>(); // Emit when saving the contest
  @Output() cancelEdit = new EventEmitter<void>(); // Emit when canceling the edit

  contestForm: FormGroup; // Form group to handle form controls
  toDateInvalid= false;

  constructor(private fb: FormBuilder, private contestService: ContestService, private router: Router) {
    // Initialize the form group
    this.contestForm = this.fb.group({
      tag: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if the contest input has changed
    debugger
    if (changes['contest'] && this.contest) {
      this.contestForm.patchValue({
        tag: this.contest.tag,
        fromDate: this.contest.fromDate,
        toDate: this.contest.toDate,
      });
    }
  }

  // Save the contest when form is submitted
  onSubmit(): void {
    if (this.contestForm.valid) {
      const updatedContest = {
        ...this.contest, // Include existing contest data
        ...this.contestForm.value, // Override with form values
      };

      this.contestService.updateContest(updatedContest.id, updatedContest).subscribe(
        (response) => {
          console.log('Contest updated successfully:', response);
          this.contestForm.reset();
          this.saveContest.emit(response);
          this.router.navigate(["contest-list"]); // Emit the updated contest
        },
        (error) => {
          console.log('Error updating contest:', error);
        }
      );
    }
  }

  // Cancel the edit process
  onCancel(): void {
    this.cancelEdit.emit(); // Emit the cancel event
  }

  ngDoCheck(): void {
    const fromDate = new Date(this.contestForm.get('fromDate')?.value);
    const toDate = new Date(this.contestForm.get('toDate')?.value);
    this.toDateInvalid = fromDate >= toDate;
  }
}
