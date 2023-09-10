import { faker } from '@faker-js/faker';

export class DataGenerator {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public productName!: string;
    public productPrice!: string;
    public productQuantity!: number;

    public constructor() {
        this.refresh();
    }

    public refresh(): void {
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
        this.productName = faker.commerce.productName();
        this.productPrice = faker.commerce.price({ min: 0.01 });
        this.productQuantity = faker.number.int({ min: 1, max: 100 });
    }
}
