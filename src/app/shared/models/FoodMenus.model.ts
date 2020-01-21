export class FoodMenus {

    constructor() { }

    _id: string;
    merchantId: string;
    name: string;
    price: number;
    description: string;
    imgUrl: string;
    options: [
        {
            title: string;
            singleChoice: boolean;
            choices: [
                {
                    title: string;
                    price: number;
                }
            ]
        }
    ]
}