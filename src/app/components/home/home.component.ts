import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TasksService } from '../../services/tasks.service';

interface Progress {
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  title: any;
  selectedValue: any;

  options: Progress[] = [
    {value: 'Iniciada'},
    {value: 'En proceso'},
    {value: 'Terminada'},
  ]

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private tasksService: TasksService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      selectedValue: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.title = this.form.controls["title"] as FormGroup;
    this.selectedValue = this.form.controls["selectedValue"] as FormGroup;
  }

  onSubmit() {
    this.tasksService.addTask(this.title.value, this.selectedValue.value);
    this.router.navigate(['/tasks']);
  }

}
