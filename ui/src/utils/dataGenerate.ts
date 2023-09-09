import { faker } from '@faker-js/faker';

export class DataGenerator {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;

    public constructor() {
        this.refresh();
    }

    public refresh(): void {
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}
