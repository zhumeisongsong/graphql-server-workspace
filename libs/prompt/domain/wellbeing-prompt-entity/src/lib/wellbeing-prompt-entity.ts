type WellbeingCategory = 
  | 'physical'  
  | 'mental'    
  | 'social'    
  | 'emotional' 
  | 'mindfulness' 
  | 'productivity' 
  | 'self-care' 
  | 'gratitude' 
  | 'creativity'; 

export interface WellbeingPromptEntity {
  id: string;
  content: string;
  category: WellbeingCategory;
  createdAt: Date;
}