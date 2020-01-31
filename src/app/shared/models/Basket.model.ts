export class Basket {
    customerId: string;
    customerName: string;
    customerImageUrl: string;
    merchantId: string;
    merchantName: string;
    orderType: string;
    paymentMethod: string;
    items: BasketItem[];
}

export class BasketItem {
    dayMenuId: string;
    foodName: string;
    numberOfItem: number;
    price: number;
    imageUrl: string;
    options: string[];
    specialInstruction: string;
}
