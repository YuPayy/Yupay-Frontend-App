// src/app/types/CashReceipt.ts

export interface Item {
  name: string;
  price: number;
}

export interface SplitMember {
  member: string;
  items: Item[];
}

export interface Totals {
  subtotal: number;
  tax: number;
  total: number;
}

export interface Member {
  id: number;
  name: string;
  items: { name: string; price: number }[];
}


export interface AddFriendCashReceiptProps {
  members: Member[];
  onAdd: () => void;
  onRemove: () => void;
}

export interface Order {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface SplitItem {
  name: string;
  price: number;
}

export interface SplitResult {
  success: boolean;
  data: {
    member: string;
    items: SplitItem[];
  }[];
}

export interface ContainerOfSystemProps {
  members: Member[];
  onAddMember: (newMember: Member) => void;
  onTotalsChange: (totals: Totals) => void;
}
