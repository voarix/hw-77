export interface Message {
  id: string;
  author: string | null;
  description: string;
  image: string | null;
}

export type MessageWithoutId = Omit<Message, 'id'>;