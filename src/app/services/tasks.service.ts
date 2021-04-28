import { Injectable, EventEmitter, Output } from '@angular/core';

import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Array<Task> = [];
  private task: string = '';

  constructor() { }

  getTasks(): Array<Task> {
    return [...this.tasks];
  }

  addTask(t: string, s: string): void {
    this.tasks.push({ title: t, state: s });
  }

  delTask(t: string): void {
    this.tasks = this.tasks.filter(task => task.title !== t);
  }

  selectedTask(t: string): void {
    this.task = t;
  }

  getSelectedTask(): string {
    return this.task;
  }

  changeState(s: string, t: string): void {
    this.tasks.map(task => {
      if (task.title === t) task.state = s
    })
  }

}
