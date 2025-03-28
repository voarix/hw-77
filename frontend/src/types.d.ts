export interface IMessage {
  id: string;
  description: string;
  author: string;
  image?: string | null;
}

export interface IMessageMutation {
  author: string;
  description: string;
  image: File | null;
}
