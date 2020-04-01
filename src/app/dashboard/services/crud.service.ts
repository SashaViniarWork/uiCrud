import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TodoModel} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  headerOption = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getCrudList() {
    return this.http.get(`${this.API_URL}/todo_list`);
  }

  deleteCrudElem(id) {
    return this.http.delete(`${this.API_URL}/todo_list/${id}`, this.headerOption);
  }

  createCrudElem(todoElem: TodoModel) {
    return this.http.post<TodoModel>(`${this.API_URL}/todo_list`, todoElem, this.headerOption);
  }

  updateCrudElem(todoElem: TodoModel) {
    return this.http.put<TodoModel>(`${this.API_URL}/todo_list/${todoElem.id}`, todoElem, this.headerOption);
  }

  getCrudElement(id) {
    return this.http.get(`${this.API_URL}/todo_list/${id}`);
  }
}
