import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Array<Task> = [];
  initiated: Array<Task> = [];
  inProgress: Array<Task> = [];
  finished: Array<Task> = [];

  constructor(private router: Router, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
    this.initiated = this.tasks.filter(task => task.state === 'Iniciada');
    this.inProgress = this.tasks.filter(task => task.state === 'En proceso');
    this.finished = this.tasks.filter(task => task.state === 'Terminada');
  }

  onClick(): void {
    this.router.navigate(['/']);
  }

  deleteTask(i: number): void {
    this.tasksService.delTask(this.initiated[i].title);
    this.initiated.splice(i, 1);
  }

  updateTask(title: string) {
    this.tasksService.selectedTask(title);
    this.router.navigate(['/update-task']);
  }

}
