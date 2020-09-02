export class Position {
    symbol: string = "";
    quantity: number = 0;
    price: number = 1;
    weight: number = 1;
    deltaQuantity: number = 0;

    constructor(init?:Partial<Position>) {
        Object.assign(this, init);
    }

    getValue(includeDelta: boolean = false): number {
        const quantity = includeDelta ? this.quantity + this.deltaQuantity : this.quantity;
        return quantity * this.price;
    }
}