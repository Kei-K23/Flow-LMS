"use server";

import { getUserSubscription } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { absoluteURL } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";

const returnURL = absoluteURL('/shop');

export const createStripeURL = async () => {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) throw new Error("Unauthorized!");

    const userSubscription = await getUserSubscription()

    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnURL,
        });

        return { data: stripeSession.url }
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Flow Pro membership",
                        description: "Flow pro membership for unlimited hearts."
                    },
                    unit_amount: 1000,
                    recurring: {
                        interval: "month"
                    }
                },

            }],
        metadata: {
            userId
        },
        success_url: returnURL,
        cancel_url: returnURL,
    });

    return { data: stripeSession.url }
}