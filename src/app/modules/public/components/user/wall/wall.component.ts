import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IPosts } from '../../../services/iposts';
import { IReactions } from '../../../services/ireactions';
import { IUser } from '../../../services/iuser';
import { PostService } from '../../../services/post.service';
import { ReactionsService } from '../../../services/reactions.service';
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
  reaction?: IReactions;

  page: number = -1;

  formPost: FormGroup;

  constructor(private router: Router, private userService: UsersService, private postsService: PostService, private reactService: ReactionsService, private _fb: FormBuilder) {
    this.formPost = this._fb.group(F_POST);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.scrollY >= (document.body.scrollHeight - document.body.offsetHeight)) {
      this.getPosts();
    }
  }

  ngOnInit(): void {
    const JWT = localStorage.getItem('token');
    const HELPER = new JwtHelperService();
    const data = HELPER.decodeToken(JWT as any);

    this.userService.getUser(data.sub).subscribe(res => this.user = res.body as IUser);
    this.getPosts();
  }

  sendPost() {
    if (this.formPost.controls['content'].valid || this.formPost.controls['media'].valid) {
      let sPost: IPosts = {
        userName: this.user?.name as string,
        content: this.formPost.value.content
      };
      console.log(sPost)

      this.postsService.postPost(sPost).subscribe(res => console.info(res));
      this.formPost.reset();
      this.posts?.unshift(sPost);
    } else {
      console.warn("WRONG...")
    }
  }

  setReact(id: any) {
    console.info(id)
    this.reaction = { user: this.user?.name, post: id };
    this.reactService.postReaction(this.reaction).subscribe(res => console.log(res));
    const r = this.posts?.forEach(p => {
      if (p.postId === id && p.userName !== this.user?.name) {
        p.reactions?.push({ userId: 0, userName: this.user?.name, reactionType: "LIKE" });
      }
    });
    console.log(r)
  }

  getPosts() {
    this.page++;
    this.postsService.getPost(this.page).subscribe(res => {
      if (this.page == 0) {
        this.posts = res as any as IPosts[];
      } else {
        let tmpArr: IPosts[] = res as any as IPosts[];
        if (tmpArr.length > 0) {
          tmpArr.forEach(item => {
            this.posts?.push(item);
          });
        }
        else {
          this.page--;
        }
      }
    });
  }

  displayFillLike(item: any[] = []): boolean {
    let r: boolean = false;
    item.forEach(e => {
      if (e.userName == this.user?.name)
        r = true;
    });
    return r;
  }
}
