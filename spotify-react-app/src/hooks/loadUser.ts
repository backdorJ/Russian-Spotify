import User from "../models/User";
import {getSubscription} from "../http/subApi";
import {getUser} from "../http/authApi";

const loadUser = async () => {
    let user = await getUser()


    let subscription = await getSubscription()
    if (subscription.isFound)
        user.initSubscription(subscription.startDate, subscription.endDate)

    return user
}

export default loadUser