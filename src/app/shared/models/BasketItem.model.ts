export class BasketItem {
    customerId: string;
    customerName: string;
    customerImageUrl: string;
    merchantId: string;
    merchantName: string;
    orderType: string;
    paymentMethod: string;
    items: Item[];
}

class Item {
    dayMenuId: string;
    foodName: string;
    numberOfItem: number;
    price: number;
    imageUrl: string;
    options: string[];
    specialInstruction: string;
}
