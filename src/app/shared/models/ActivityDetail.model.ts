export class ActivityDetail {

    // tslint:disable-next-line: variable-name
    _id: string;
    orderType: string;
    dateTime: string;
    state: string;
    queue: number;
    customerId: string;
    customerName: string;
    customerImageUrl: string;
    merchantId: string;
    merchantName: string;
    items: ActivityItem[];
    paymentMethod: string;
}

export class ActivityItem {
    dayMenuId: string;
    foodName: string;
    numberOfItem: number;
    price: number;
    imageUrl: string;
    options: string[];
    specialInstruction: string;
}
