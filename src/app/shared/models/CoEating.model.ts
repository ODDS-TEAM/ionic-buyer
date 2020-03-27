export class CreateTableRequest {
    leaderId: string;
    tableName: string;
    restaurantName: string;
    merchantId: string;
}

export class CreateTableResponse {

}

export class Restaurant {
    restaurantName: string;
    merchantId: string;
    imageUrl: string;
}

export class RestaurantMenu {
    menuName: string;
    price: number;
    imageUrl: string;
}

export class Table {
    // tslint:disable-next-line: variable-name
    _id?: string;
    leaderId: string;
    tableName: string;
    restaurantName: string;
    merchantId: string;
    inviteCode: string;
    state: string;
    baskets: TableBasket[];
}

export class TableBasket {
    customerId: string;
    items: TableItem[];
}

export class TableItem {
    options: string[];
    dayMenuId: string;
    foodName: string;
    numberOfItem: number;
    price: number;
    imageUrl: string;
    specialInstruction: string;
}
