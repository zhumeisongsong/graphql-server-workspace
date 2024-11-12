export interface DailyPromptRecordEntity {
  id: string;
  promptId: string;
  userId: string;
  createdAt: Date;
  completedAt?: Date;
}