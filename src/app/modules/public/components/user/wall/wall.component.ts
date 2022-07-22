import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IPosts } from '../../../services/iposts';
import { IUser } from '../../../services/iuser';
import { PostService } from '../../../services/post.service';
import { UsersService } from '../../../services/users.service';
import { F_POST } from '../../post.form';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  user?: IUser;
  posts?: IPosts[];

  formPost: FormGroup;

  constructor(private router: Router, private userService: UsersService, private postsService: PostService, private _fb: FormBuilder) {
    this.formPost = this._fb.group(F_POST);
  }

  ngOnInit(): void {
    const JWT = localStorage.getItem('token');
    const HELPER = new JwtHelperService();
    const data = HELPER.decodeToken(JWT as any);

    this.userService.getUser(data.sub).subscribe(res => this.user = res.body as IUser);
    setInterval(()=>{this.postsService.getPost().subscribe(res => this.posts = res as any as IPosts[]);},1000);
    
  }

  sendPost() {
    if (this.formPost.controls['content'].valid || this.formPost.controls['media'].valid) {
      let sPost: IPosts = {
        userName: this.user?.name as string,
        content: this.formPost.value.content
      };
      console.log(sPost)

      this.postsService.postPost(sPost).subscribe(res => console.info(res));
      // this.postsService.getPost().subscribe(res => this.posts = res as any as IPosts[]);
      this.formPost.reset();
    } else {
      console.warn("WRONG...")
    }
  }

}
