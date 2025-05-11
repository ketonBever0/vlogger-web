import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth/auth.service';
import { StoreService } from '../../../core/services/store/store.service';
import { doc, updateDoc } from '@angular/fire/firestore';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProfileComponent {
  constructor(
    protected readonly fAuth: AuthService,
    private readonly fStore: StoreService,
    private readonly formBuilder: FormBuilder
  ) {
    this.editDescriptionForm = this.formBuilder.group({});
  }

  editDescriptionForm: FormGroup;
  editDescription = false;

  setEditDesription() {
    this.editDescriptionForm = this.formBuilder.group({
      description: [this.fAuth.userData?.description],
    });
    this.editDescription = true;
  }

  async saveDescription() {
    await updateDoc(doc(this.fStore.db, 'users', this.fAuth.userData!.id), {
      description: this.editDescriptionForm.value.description,
      updatedAt: new Date(),
    });
    this.editDescription = false;
  }
}
