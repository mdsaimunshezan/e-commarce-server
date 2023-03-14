import Stripe from "stripe";
import * as dotenv from "dotenv";
import OrderModel from "../models/orderModel.js";
import ProdectModel from "../models/prodectModel.js";

//ENV CONFIGE
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

export const payment = async (req, res) => {
  const { cartItem, user } = req.body;
  console.log(req.body)

  const orderData = cartItem.map((item) => {
    return {
      _id: item._id,
      size: item.size,
      color: item.color,
      quantity: item.quantaty,
      userId: user.userId,
    };
  });

  try {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        cart: JSON.stringify(orderData),
      },
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: { allowed_countries: ["PK", "IN", "BD"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      line_items: cartItem.map((item) => {
        const parsent = item.discount / 100;
        const discountPrice = item.price - item.price * parsent;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: discountPrice * 100,
          },
          quantity: item.quantaty,
        };
      }),
      customer: customer.id,
      mode: "payment",
      success_url: `http://localhost:3000/user?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cart",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const storeData = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      process.env.ENDPOINT_SECRET
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log("error", err.message);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      break;
    case "checkout.session.completed":
      const data = event.data.object;
      let customer = await stripe.customers.retrieve(data.customer);
      customer = JSON.parse(customer?.metadata?.cart);

      customer.forEach(async (item) => {
        try {
          await OrderModel.create({
            prodectId: item._id,
            userId: item.userId,
            size: item.size,
            color: item.color,
            quantities: item.quantity,
            address: data.customer_details.address,
          });

          const findStock = await ProdectModel.findOne({ _id: item._id });
          if (findStock) {
            let stock = findStock.stock - item.quantity;
            if (stock < 0) {
              stock = 0;
            }
            await ProdectModel.findOneAndUpdate(
              { _id: item._id },
              { stock: stock },
              { new: true }
            );
          }
        } catch (error) {
          console.log(error)
          response.status(500).json({ message: "server internal error" });
        }
      });

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
};

export const varifyPayment = async (req, res) => {
  const { id } = req.params;
  console.log("id",id)
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    res
      .status(200)
      .json({
        message: "your payment successfull",
        status: session.payment_status,
      });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};
