import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoModel} from '../../models/todo.model';
import {Observable} from 'rxjs';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updateForm: FormGroup;
  todoElement: TodoModel;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private r: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.r.params.subscribe(params => {
      this.updateForm = this.createFormFroup();
      this.getElementTodo(params.id);
    });
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  createFormFroup() {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
      createdAt: new FormControl(),
    });
  }

  save() {
    this.todoElement = {
      id: this.updateForm.value.id,
      name: this.updateForm.value.name,
      description: this.updateForm.value.description,
      createdAt: this.updateForm.value.createdAt,
      editedAt: new Date()
    };
    this.crudService.updateCrudElem(this.todoElement).subscribe(data => {
      this.openSnackBar('Todo was updated', 'close');
      this.router.navigate(['dashboard/list']);
    });
  }

  delete() {
    this.crudService.deleteCrudElem(this.updateForm.value.id).subscribe(data => {
      this.router.navigate(['dashboard/list']);
    });
  }

  getElementTodo(id) {
    this.crudService.getCrudElement(id).subscribe(res => {
      this.updateForm.setValue(res);
    });
  }

}
