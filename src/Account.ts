
import type { Position } from './Position';

export class Account {
    cash: number = 0;
    deltaCash: number = 0;
    cashWeight: number = 0;
    positions: Position[] = [];

    getTotalValue(includeDelta: boolean = false): number {
        let value = includeDelta? this.cash + this.deltaCash : this.cash;
        this.positions.forEach(pos => {
            value += pos.getValue(includeDelta);
        })
        return value;
    }

    getTotalWeight(): number {
        let weight = this.cashWeight;
        this.positions.forEach(pos => {
            weight += pos.weight;
        })
        return weight;
    }

    getCashAllocation(includeDelta?: boolean) {
        return (includeDelta ? this.cash + this.deltaCash : this.cash) / this.getTotalValue(includeDelta);
    }

    getAllocation(position: Position, includeDelta?: boolean): number {
        if (this.positions.indexOf(position) < 0) {
            // error
        }
        return position.getValue(includeDelta) / this.getTotalValue(includeDelta);
    }

    getScore(): number {
        let subScore = 0;
        subScore += this.getCashSubScore();
        this.positions.forEach(pos => {
            subScore += this.getSubScore(pos);
        });
        return Math.sqrt(subScore);
    }

    balance(buyOnly: boolean = false) {
        let lastScore: number;

        this.resetDeltas();

        if (!buyOnly) {
            for (let position of this.positions) {
                const idealQuantity = Math.floor(((position.weight / this.getTotalWeight()) * this.getTotalValue()) / position.price);
                position.deltaQuantity = idealQuantity - position.quantity;
                this.deltaCash -= position.deltaQuantity * position.price;
            }
        }

        do {
            lastScore = this.getScore();
            const choices: {position: Position, deltaQuantity: number, score: number}[] = [];
            for (let position of this.positions.concat().sort((a, b) => (a.price > b.price) ? -1: 1)) {
                const originalDeltaQuantity = position.deltaQuantity;
                const originalDeltaCash = this.deltaCash;

                if ((this.cash + this.deltaCash) >= position.price) {
                    position.deltaQuantity = originalDeltaQuantity + 1;
                    this.deltaCash = originalDeltaCash - position.price;
                    if (this.getScore() < lastScore) {
                        continue;
                    }
                    position.deltaQuantity = originalDeltaQuantity;
                    this.deltaCash = originalDeltaCash;
                }

                if ((position.quantity + position.deltaQuantity) > 0 && (!buyOnly || (position.quantity + position.deltaQuantity) > position.quantity)) {
                    position.deltaQuantity = originalDeltaQuantity - 1;
                    this.deltaCash = originalDeltaCash + position.price;
                    if (this.getScore() < lastScore) {
                        continue;
                    }
                    position.deltaQuantity = originalDeltaQuantity;
                    this.deltaCash = originalDeltaCash;
                
                }
            }
        } while(this.getScore() < lastScore);
    }

    private getCashSubScore() {
        const plannedAllocation = (this.cash + this.deltaCash) / this.getTotalValue(true);
        const targetAllocation = this.cashWeight / this.getTotalWeight();

        const result = Math.pow(targetAllocation - plannedAllocation, 2);

        return result;
    }

    private getSubScore(position: Position): number {
        const plannedAllocation = position.getValue(true) / this.getTotalValue(true);
        const targetAllocation = position.weight / this.getTotalWeight();

        const result = Math.pow(targetAllocation - plannedAllocation, 2);

        return result;
    }

    private resetDeltas(){
        this.deltaCash = 0;
        this.positions.forEach(pos => {
            pos.deltaQuantity = 0;
        })
    }
}