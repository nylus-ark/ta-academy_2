import { faker } from '@faker-js/faker';

export class DataGenerator {
    public productName!: string;
    public productPrice!: string;
    public productQuantity!: number;

    public constructor() {
        this.refresh();
    }

    public refresh(): void {
        this.productName = faker.commerce.productName();
        this.productPrice = faker.commerce.price({ min: 0.01 });
        this.productQuantity = faker.number.int({ min: 1, max: 100 });
    }
}
