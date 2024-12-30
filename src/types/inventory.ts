export type StickCategory = 'Senior' | 'Junior' | 'Youth' | 'Intermediate';

export interface StickInventory {
  id: string;
  model: string;
  curve: string;
  hand: 'LH' | 'RH';
  flex: number;
  weight: number;
  price: number;
  quantity: number;
  category: StickCategory;
  is_sold: boolean;
}