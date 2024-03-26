export default class GetSubscriptionDto {
    startDate: Date = new Date(Date.now())
    endDate: Date = new Date(Date.now())
    isFound: boolean = false;

    constructor() {
    }

    static init(startDate: Date, endDate: Date) {
        let getSubscriptionDto = new GetSubscriptionDto();

        getSubscriptionDto.startDate = startDate;
        getSubscriptionDto.endDate = endDate;
        getSubscriptionDto.isFound = true;

        return getSubscriptionDto;
    }
}