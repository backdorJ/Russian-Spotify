import User from "../models/User";
import {getSubscription} from "../http/subApi";

const loadUser = async () => {
    let user = new User()
    if (localStorage.getItem('token'))
        user = new User()

    let subscription = await getSubscription()
    if (subscription.isFound)
        user.initSubscription(subscription.startDate, subscription.endDate)

    return user
}

export default loadUser