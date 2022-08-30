import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-hometable',
  templateUrl: './hometable.component.html',
  styleUrls: ['./hometable.component.scss']
})
export class HometableComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category', 'price', 'date', 'quality', 'comment', 'actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) { };

  ngOnInit(): void {
    this.getAllProducts();
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert("Error while fetching the records!!!")
      },
    });
  };
}
