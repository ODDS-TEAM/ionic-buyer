export class FoodDetail {

    // tslint:disable-next-line: variable-name
    _id: string;
    merchantId: string;
    foodName: string;
    price: number;
    description: string;
    imageUrl: string;
    options: FoodOption[];
}

export class FoodOption {

    // tslint:disable-next-line: variable-name
    _id: string;
    titleOption: string;
    singleChoice: boolean;
    required: boolean;
    choices: OptionChoice[];
}

export class OptionChoice {

    // tslint:disable-next-line: variable-name
    _id: string;
    titleChoice: string;
    priceChoice: number;
}
