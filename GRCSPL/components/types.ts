export interface Product {
  name: string;
  category: string;
  src: string;
  code: string;
  mrp: number;
  discountPrice: number;
  businessValue: number;
  description: string;
  benefit: string;
  usageTips?: string;
  useTips?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}