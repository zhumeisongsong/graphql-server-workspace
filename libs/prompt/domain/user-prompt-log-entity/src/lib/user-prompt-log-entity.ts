export interface UserPromptLogEntity {
  id: string;
  promptId: string;
  userId: string;
  createdAt: Date;
  completedAt?: Date;
}