import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
    private api: ApiService,
    private dialogRef : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category: ['',Validators.required],
      quality: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });

    if(this.editData) {
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['quality'].setValue(this.editData.quality);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.actionButton = "Update";
    }
  };

  qualityList = ['Worse','Bad','Average','Good', 'Excellent'];
  productForm !: FormGroup;
  actionButton: string = "Submit";

  addProduct() {

    if(this.editData)
    {
      this.updateProduct();
    }
    else
    {
      if(this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({ next: (res) => {
          alert("Product details have been saved!");
          this.productForm.reset();
          this.dialogRef.close('save');

        },
        error: () => {
          alert("Error while saving the details!!!");
        },
      });
      }
    }
  };

  updateProduct() {
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res) => {
        console.log(res);
        alert("Product details has been updated!");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (res) => {
        console.log(res);
        alert("Error while updating the details!!!");
      },
    });
  };
}
