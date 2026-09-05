export interface TokenDefinition {
  name: string;
  variable: string;
  lightValue: string;
  darkValue: string;
  category: 'color' | 'typography' | 'shape' | 'elevation';
  description: string;
}

export interface StateItem {
  id: string;
  label: string;
  description: string;
  cssClass: string;
}

export interface ShowcaseProduct {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  inStock: boolean;
  material: string;
  colorSwatch: string;
}
