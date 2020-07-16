import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum PostStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}



export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

export declare class Tweet {
  readonly id: string;
  readonly tweet: string;
  readonly retweet?: number;
  readonly likes?: number;
  constructor(init: ModelInit<Tweet>);
  static copyOf(source: Tweet, mutator: (draft: MutableModel<Tweet>) => MutableModel<Tweet> | void): Tweet;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly rating: number;
  readonly status: PostStatus | keyof typeof PostStatus;
  readonly retweet?: number;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}