import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "";

export const stripe = stripeKey && !stripeKey.includes("xxxxxxxxxxxx")
  ? new Stripe(stripeKey, {
      apiVersion: "2026-07-29.dahlia",
    })
  : null;

export function getStripe() {
  if (!stripe) {
    throw new Error("Stripe no esta configurado. Verifica STRIPE_SECRET_KEY en .env.local");
  }
  return stripe;
}
