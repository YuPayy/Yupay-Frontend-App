export type Item = {
  id: number;
  name: string;
  price: number;
  qty: number;
};



export const item: Item = {
  id: 1,
  name: "Burger",
  price: 20000,
  qty: 2,
};

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
  items: Item[];
}

export interface AddFriendCashReceiptProps {
  members: Member[];
  onAdd: (newMember: Member) => void;
  onRemove: () => void;
  groupId: number;
}

export interface Order {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface SplitResult {
  groupId: number;
  groupName: string;  
  members: Member[];
  totals: Totals;
  orders: Order[];
}


export interface ContainerOfSystemProps {
  members: Member[];
  onAddMember: (newMember: Member) => void;
  onTotalsChange: (totals: Totals) => void;
}
