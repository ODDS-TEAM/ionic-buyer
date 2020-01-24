import { FoodMenus } from './FoodMenus.model';

export class DayMenus {
    _id: string;
    day: string;
    week: number;
    year: number;
    date: Date;
    foodMenuId: string;
    foodMenuItem: FoodMenus;
}
