import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments';
import { getFunctions, httpsCallable } from '@firebase/functions';
import app from '../firebase';

//function to get stripe payments (takes the app and then configuration options (collections))
const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

// request to createCheckoutSession - creates a new strip checkout session
const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    // navigate to given url
    // so if succesful navigate to stripe payment portal
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message));
};

// export loadCheckout as a named export
export { loadCheckout };
export default payments;
