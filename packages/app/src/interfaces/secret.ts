export interface SecretCommentItem {
  id: string;
  createdAt: string;
  content: string;
  profileUrl: string;
}

export interface SecretItem {
  id: string;
  createdAt: string;
  content: string;
  commentCount: number;
  comments: SecretCommentItem[];
}
