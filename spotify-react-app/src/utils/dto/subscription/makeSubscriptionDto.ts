export default class MakeSubscriptionDto {
    subscriptionLength: number;

    constructor(subscriptionLength: number) {
        if (subscriptionLength !== parseInt(subscriptionLength.toString()))
            throw new Error("Could not parse subscription length");

        this.subscriptionLength = subscriptionLength;
    }

}