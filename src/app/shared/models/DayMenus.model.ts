import { FoodMenus } from './FoodMenus.model';

export class DayMenus {
    merchantId: string;
    restaurantName: string;
    menus: Menu[];
}

class Menu {
    // tslint:disable-next-line: variable-name
    _id: string;
    day: string;
    week: number;
    year: number;
    date: string;
    dateTime: Date;
    foodMenuId: string;
    merchantId: string;
    menuName: string;
    price: number;
    foodLeft: number;
    imageUrl: string;
}
