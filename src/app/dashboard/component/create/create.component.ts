import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoModel} from '../../models/todo.model';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  updateForm: FormGroup;
  todoElement: TodoModel;


  private state: Observable<any>;

  constructor(private crudService: CrudService, private router: Router, private snackBar: MatSnackBar) {
    this.updateForm = this.createFormFroup();
  }

  ngOnInit() {
  }

  createFormFroup() {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
      createdAt: new FormControl(),
      editedAt: new FormControl(),
    });
  }

  save() {
    this.todoElement = {
      id: null,
      name: this.updateForm.value.name,
      description: this.updateForm.value.description,
      createdAt: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ),
    };
    this.crudService.createCrudElem(this.todoElement).subscribe(data => {
      this.openSnackBar('Todo was created', 'close');
      this.router.navigate(['dashboard/list']);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
