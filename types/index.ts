export interface Creator {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface Post {
  _id: string;
  prompt: string;
  tag: string;
  creator: Creator;
}
