import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl:'./user.component.html',
  styles: ``
})
export class UserComponent {

  //local array to store users
  userService = inject(UserService); // Inject the UserService

  user = computed(() => this.userService.currentUser() || { id: '', name: '', email: '' }); // Signal to track the current user
  // editingUserId: string|null = null; // Variable to store the ID of the user being edited

  ngOnInit() {
    // this.user = this.userService.currentUser() || { id: '', name: '', email: '' }; // Initialize the user object
    // this.editingUserId = this.user?.id ?? null; // Set the ID of the user being edited
  }

   addUser() {
    // Check if the user object has valid name and email before adding
    if (this.user().name && this.user().email) {
      this.userService.addUser(this.user());
    }
    // this.user = { id: '', name: '', email: '' }; // Reset the user object after adding
    this.userService.currentUser.set({ id: '', name: '', email: '' }); // Clear the current user signal
  }

  updateUser() {    
        if (this.user().name && this.user().email)
            this.userService.updateUser(this.user().id, this.user())
        // this.user = { id: '', name: '', email: '' }; // Reset the user object
         this.userService.currentUser.set({ id: '', name: '', email: '' }); // Clear the current user signal
        // this.editingUserId = null; // Clear the editing user ID
        // this.userService.currentUser.set(null); // Clear the current user signal
    }

  resetUserForm() {
    // this.user = { id: '', name: '', email: '' }; // Reset the user object
             this.userService.currentUser.set({ id: '', name: '', email: '' }); // Clear the current user signal
    // this.editingUserId = null; // Clear the editing user ID 
            // this.userService.currentUser.set(null); // Clear the current user signal
  }

}
