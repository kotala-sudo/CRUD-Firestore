import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user.model';
import { UserService } from './user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD';

  users: User[] = [];
  user: User = {
    id: '',
    name: '',
    email: '',
  }

  usersWithNameAlice: User[] = [];

  editingUserId: string | null = null; // Variable to store the ID of the user being edited

  userService = inject(UserService); // Inject the UserService

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.userService.getUserByName('Alice').subscribe(users =>
      this.usersWithNameAlice = users
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
  }
  
  resetForm() {
    this.user = { id: '', name: '', email: '' }; // Reset the user object
    this.editingUserId = null; // Clear the editing user ID 
  }
}
