import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styles: ``
})
export class TaskListComponent {

  userService = inject(UserService); // Inject the UserService
  taskService = inject(TaskService); // Inject the TaskService
  selectedUser = this.userService.selectedUser; // Get the selected user from the UserService
  // tasks = signal<Task[]>([]); // Array to store tasks for the selected user
  // tasks = computed(() => { return this.taskService.getTasksByUserId(this.selectedUser()!.id).subscribe( tasks => {return tasks}) }); // Get tasks for the selected user

  tasks = this.taskService.tasks;

  // ngOnInit() {
  //   const userId:string = this.selectedUser()!.id; // Get the ID of the selected user
  //   console.log('Selected user ID:', userId); // Log the selected user ID
  //   this.taskService.getTasksByUserId('xuUAfZTmi8vlLrH9xqhc').subscribe(t => {
  //     console.log('Tasks for user:', t); // Log the tasks for the selected user
  //     this.tasks = t; // Assign the tasks to the local array
  //   });
  // }

}
