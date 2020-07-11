import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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