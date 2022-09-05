import { Component, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component';
import { HometableComponent } from './hometable/hometable.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild (HometableComponent) child: any;
  title = 'crud-angular';

  constructor(private dialog: MatDialog) {};

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "40%",
    }).afterClosed().subscribe( val => {
      if (val=== 'save')
      {
        this.child.getAllProducts();
      }
    });
  };
}
