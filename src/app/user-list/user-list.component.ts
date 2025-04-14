import { Component, inject, signal } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styles: ``
})
export class UserListComponent {

  userService = inject(UserService); // Inject the UserService
  taskService = inject(TaskService); // Inject the TaskService

  users: User[] = []; // Array to store users
  

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

    editUser(user: User) {
    // this.userService.currentUser.update(u => { 
    //   if (u) {
    //     console.log('Editing user:', user); // Log the user being edited
    //     u.id = user.id; // Set the ID of the user being edited
    //     return u; // Return the updated user
    //   }
    //   return null; // Return null if the user is null
    // }
    this.userService.currentUser.set(user); // Set the current user signal to the user being edited
    console.log('Editing user:', user); // Log the user being edited
    // this.user = { ...user }; // Populate the form with the user's data
  }

    deleteUser(id: string) {  
    this.userService.deleteUser(id);
    this.taskService.deleteTasksByUserId(id); // Delete tasks associated with the user
   
  }

    selectUserforTask(user: User){
      this.userService.selectedUser.set(user); // Set the current user signal to the selected user
      console.log('Selected user for task:', user); // Log the selected user
    // this.userService.getUserById(userId).subscribe((user: User) => {
    //   this.selectedUser.set(user); // Set the selected user
    // })

    this.taskService.getTasksByUserId(user.id).subscribe((tasks: Task[]) => {
      this.taskService.tasks.set(tasks); // Set the userId for the new task 
      // this.tasks.set(tasks); // Set the tasks for the selected user
    }
    )   
  }
}
