import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TasksService } from '../../services/tasks.service';

interface Progress {
  value: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  form: FormGroup;
  title: any;
  selectedValue: any;
  disabledName = true;

  options: Progress[] = [
    {value: 'Iniciada'},
    {value: 'En proceso'},
    {value: 'Terminada'},
  ]

  constructor(private router: Router,
    private tasksService: TasksService,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [this.tasksService.getSelectedTask()],
      selectedValue: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.title = this.form.controls["title"] as FormGroup;
    this.selectedValue = this.form.controls["selectedValue"] as FormGroup;
    this.form.get('title')?.disable();
  }

  onUpdate() {
    this.tasksService.changeState(this.selectedValue.value, this.tasksService.getSelectedTask());
    this.router.navigate(['/tasks']);
  }
}
