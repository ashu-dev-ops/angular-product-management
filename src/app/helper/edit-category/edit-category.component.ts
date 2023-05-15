import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  imageForm: FormGroup;
  previewUrl: any = null;
  loading: boolean = false;
  image: any = null;
  id: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<EditCategoryComponent>,
    private _catHttp: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageForm = this.formBuilder.group({
      image: [null],
      name: '',
    });
  }
  ngOnInit(): void {
    this.imageForm.patchValue(this.data);
    // console.log(this.imageForm.value);
    this.image = this.data.image;
    console.log(this.data);
    this.id = this.data._id;
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.previewUrl = reader.result;
        this.imageForm.patchValue({
          image: file,
        });
        this.image = null;
      };
    }
  }
  onSubmit() {
    // Handle form submission here
    // this._dialogRef.close(true);
    if (this.data) {
      console.log('running');
      const formData = new FormData();
      formData.append('name', this.imageForm.get('name')?.value);
      // formData.append('email', this.myForm.get('email').value);
      // formData.append('file', this.imageForm.get('file').value);
      formData.append('avatar', this.imageForm.get('image')?.value);
      console.log(formData);
      this.loading = true;
      this._catHttp.updateCategory(formData,this.id).subscribe({
        next: (value: any) => {
          console.log("this must run");
          this._catHttp.getAllCategory();
          this._dialogRef.close(true);
          this.loading = false;
        },
        error: (err) => console.log(err),
      });
    } else {
      const formData = new FormData();
      formData.append('name', this.imageForm.get('name')?.value);
      // formData.append('email', this.myForm.get('email').value);
      // formData.append('file', this.imageForm.get('file').value);
      formData.append('avatar', this.imageForm.get('image')?.value);
      console.log(formData);
      this.loading = true;
      this._catHttp.createCategory(formData).subscribe({
        next: (value: any) => {
          this._catHttp.getAllCategory();
          this._dialogRef.close(true);
          this.loading = false;
        },
        error: (err) => console.log(err),
      });
    }
  }
  onCancle() {
    this._dialogRef.close(true);
  }
}
