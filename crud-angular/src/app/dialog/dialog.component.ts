import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private api: ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category: ['',Validators.required],
      quality: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });
  };

  qualityList = ['Worse','Bad','Average','Good', 'Excellent'];

  productForm !: FormGroup;

  addProduct() {
    if(this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({ next: (res) => {
        alert("Product details have been saved!");
        this.productForm.reset();
        this.dialogRef.close();

      },
      error: () => {
        alert("Error while saving the details!!!");
      },
    });
    };
  };
}
