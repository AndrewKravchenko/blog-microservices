export type CommentStatus = 'approved' | 'rejected' | 'pending';

export type Comment = {
  id: string;
  content: string;
  status: CommentStatus;
};
