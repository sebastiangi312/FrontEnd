import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + '/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  constructor() { }
}
