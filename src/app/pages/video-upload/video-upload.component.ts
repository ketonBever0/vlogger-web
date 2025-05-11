import { AuthService } from '@app/core/services/auth/auth.service';
import { TourVideoService } from '@app/core/services/tour-video/tour-video.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss'],
})
export class VideoUploadComponent implements OnInit {
  constructor(
    private readonly fAuth: AuthService,
    protected readonly tv: TourVideoService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.addVideoForm = formBuilder.group({
      title: ['', Validators.required],
      tourId: [''],
      description: ['', Validators.maxLength(600)],
    });
  }

  selectedTour = '';

  addVideoForm: FormGroup;

  snackBar = inject(MatSnackBar);

  async onSubmit() {
    const success = await this.tv.addVideo({
      title: this.addVideoForm.value.title,
      tourId: this.addVideoForm.value.tourId,
      description: this.addVideoForm.value.title,
    });

    if (success) {
      this.snackBar.open('Videó hozzáadva', '', { duration: 3000 });
      this.router.navigateByUrl('/');
    }
  }

  async ngOnInit() {
    await this.tv.getTours();
  }
}
