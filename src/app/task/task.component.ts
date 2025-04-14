import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styles: ``
})
export class TaskComponent {

  userService = inject(UserService); // Inject the UserService
  taskService = inject(TaskService); // Inject the TaskService

  selectedUser = this.userService.selectedUser; // Get the selected user from the UserService

    newTask = signal<Task>({
    taskId: '',
    userId: '', 
    title: '',
    description: ''
  });

  addTask(userId: string, task: Task) {
    // console.log("Adding task", task);
    if (task.title && task.description) {
      this.taskService.addTask(userId, task); // Add the task using the TaskService
    }
    this.resetTaskForm();
  }

  resetTaskForm() {
    this.newTask.set({
    taskId: '',
    userId: '', 
    title: '',
    description: ''
  }); // Reset the user object
  }
}
