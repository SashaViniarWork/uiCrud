import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'editedAt', 'Action'];
  dataSource;

  constructor(private crudService: CrudService, private router: Router, private snackBar: MatSnackBar) {
    this.getList();
  }

  getList() {
    this.crudService.getCrudList().subscribe(data => {
      this.dataSource = data;
    });
  }

  delete(element) {
    this.crudService.deleteCrudElem(element.id).subscribe(data => {
      this.getList();
      this.openSnackBar('Todo was deleted', 'close');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  edit(element) {
    this.router.navigate(['dashboard/update', element.id]);

  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

}
