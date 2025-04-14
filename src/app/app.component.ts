import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user.model';
import { UserService } from './user.service';
import {FormsModule} from '@angular/forms';
import { TaskService } from './task.service';
import { Task } from './task';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, UserComponent, UserListComponent, TaskComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD';

  //local array to store users
  users: User[] = [];
  //meant to track current user
  user: User = {
    id: '',
    name: '',
    email: '',
  }
  //store the name of the user to search
  searchName = "";
  //stores users matching the search name
  usersWithName: User[] = [];

  editingUserId: string | null = null; // Variable to store the ID of the user being edited

  userService = inject(UserService); // Inject the UserService

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  searchByName(){
    this.userService.getUserByName(this.searchName).subscribe((users: User[] )=>
      this.usersWithName = users
    )
  }


  addUser() {
    // Check if the user object has valid name and email before adding
    if (this.user.name && this.user.email) {
      this.userService.addUser(this.user);
    }
    this.user = { id: '', name: '', email: '' }; // Reset the user object after adding
  }

  editUser(user: User) {
    this.editingUserId = user.id ?? null; // Set the ID of the user being edited
    this.user = { ...user }; // Populate the form with the user's data
  }

  updateUser() {    
        if (this.user.name && this.user.email)
            this.userService.updateUser(this.user.id, this.user)
        this.user = { id: '', name: '', email: '' }; // Reset the user object
        this.editingUserId = null; // Clear the editing user ID
    }

  deleteUser(id: string) {  
    this.userService.deleteUser(id);
    this.taskService.deleteTasksByUserId(id); // Delete tasks associated with the user
   
  }
  
  resetUserForm() {
    this.user = { id: '', name: '', email: '' }; // Reset the user object
    this.editingUserId = null; // Clear the editing user ID 
  }

  selectedUser = signal<User| null>(null); // Signal to track the selected user
  tasks = signal<Task[]>([]); // Signal to track the tasks of selected user
  taskService = inject(TaskService); // Inject the TaskService

  newTask = signal<Task>({
    taskId: '',
    userId: '', 
    title: '',
    description: ''
  });

  addTask(userId: string, task: Task) {
    console.log("Adding task", task);
    if (task.title && task.description) {
      this.taskService.addTask(userId, task); // Add the task using the TaskService
    }
  }
  
  getTasks(userId: string){
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.selectedUser.set(user); // Set the selected user
    })

    this.taskService.getTasksByUserId(userId).subscribe((tasks: Task[]) => {
      this.tasks.set(tasks); // Set the userId for the new task 
      // this.tasks.set(tasks); // Set the tasks for the selected user
    }
    )   
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
