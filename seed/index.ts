import {seedChef} from "./chef";
import {seedPayment} from "./payments";
import {seedSubscription} from "./subscription";
import {seedMeals} from "./meal";
import {seedOrders} from "./orders";

const seedToDB = async () => {
    const DEFAULT = {
        user: "d48e9be1-9588-44aa-bf0f-780404bb257a",
        chef: "e598f1af-2cc4-429d-9f71-b1da2cfe50cc",
        planId: 1,
        slotId: 1
    }

    const payment = await seedPayment()
    console.log(`Seeded payment with the id ${payment?.data?.insert_payments_one?.id}`)

    const sub = await seedSubscription({
        assignedChefId: DEFAULT.chef,
        paymentId: payment?.data?.insert_payments_one?.id,
        planId: DEFAULT.planId,
        slotId: DEFAULT.slotId
    })
    console.log(`Seeded subscriptions with the id ${sub?.data?.insert_subscriptions_one?.id}`)

    const meal = await seedMeals();
    console.log(`Seeded meal with the id ${meal?.data?.insert_meals_one?.id}`)

    for (let i = 0; i < 10; i++) {
        const order = await seedOrders({
            mealId: Number(`${meal.data.insert_meals_one.id}`),
            slotId: DEFAULT.slotId,
            subscriptionId: sub?.data?.insert_subscriptions_one?.id
        })

        console.log(`Seeded order with the id ${order?.data?.insert_orders_one?.id}`)
    }
}

seedToDB();