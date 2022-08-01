import { IComment } from "./icomment";
import { IReactions } from "./ireactions";

export interface IPosts {
    postId?: number;
    media?: any;
    content?: string;
    posted?: Date;
    userName: String;
    reactions?: IReactions[];
    comments?: IComment[];
}