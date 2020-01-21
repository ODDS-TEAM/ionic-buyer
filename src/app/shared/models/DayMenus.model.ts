import { FoodMenus } from './foodMenus.model';

export class DayMenus {
    _id: string;
    day: string;
    week: number;
    year: number;
    date: Date;
    foodMenuId: string;
    foodMenuItem: FoodMenus;
}
