# Natuva Gourmet — Integration Guide

This guide describes how to connect the static frontend forms and shopping cart in **Natuva Gourmet** to live backend services, email providers, and payment gateways.

---

## 1. Connecting Contact & B2B Forms to Email Services

All forms on `contact.html`, `bulk-orders.html`, and `index.html` (Newsletter) are pre-configured with client-side HTML5 validation and async simulation in [`assets/js/forms.js`](file:///d:/Desktop/IQ-CRM%20projects/DryNuts/assets/js/forms.js).

### Option A: Using Web3Forms (Zero Backend, Instant Setup)

1. Get a free Access Key from [Web3Forms](https://web3forms.com/).
2. In `contact.html` and `bulk-orders.html`, set the `<form>` attributes:

```html
<form action="https://api.web3forms.com/submit" method="POST" id="contactForm">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
  <input type="hidden" name="subject" value="New Inquiry from Natuva Website">
  <!-- existing input fields remain unchanged -->
</form>
```

3. In `assets/js/forms.js`, update the form submit handler to allow standard POST or send via `fetch()`:

```javascript
fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    showFeedback(form, 'success', 'Thank you! Your message has been dispatched to our culinary concierge.');
  }
});
```

### Option B: Using Formspree

1. Sign up at [Formspree.io](https://formspree.io/) and create a new form endpoint (e.g. `https://formspree.io/f/xvovbwyz`).
2. Update the form element:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="bulkOrderForm">
  <!-- existing fields -->
</form>
```

### Option C: Using a Standard PHP Mailer Script

If deploying to Apache or cPanel hosting, create a `mail.php` script:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    $to = "concierge@natuvagourmet.com";
    $subject = "New Inquiry from Natuva Website";
    $headers = "From: $name <$email>";
    
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Message sent!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send."]);
    }
}
?>
```

---

## 2. Connecting the Shopping Cart to Payment Gateways

The shopping cart in [`assets/js/cart.js`](file:///d:/Desktop/IQ-CRM%20projects/DryNuts/assets/js/cart.js) maintains state in `localStorage.getItem('natuva_cart')`.

### Option A: Integrating Stripe Checkout

1. Create a serverless function (AWS Lambda, Vercel, or Node.js) that creates a Stripe Checkout Session:

```javascript
// Example Vercel serverless function: api/checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items } = req.body;
  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name, images: [item.image] },
      unit_amount: Math.round(item.price * 100)
    },
    quantity: item.qty
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${req.headers.origin}/pricing.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/products.html`,
  });

  res.status(200).json({ id: session.id, url: session.url });
}
```

2. In `assets/js/cart.js`, inside `proceedToCheckout()`:

```javascript
async function proceedToCheckout() {
  const cartItems = getCart();
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems })
  });
  const data = await response.json();
  if (data.url) {
    window.location.href = data.url;
  }
}
```

### Option B: Integrating PayPal Buttons

Include the PayPal SDK in your checkout modal:

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
<div id="paypal-button-container"></div>
```

Render the buttons using the cart total:

```javascript
paypal.Buttons({
  createOrder: (data, actions) => {
    const total = calculateTotal();
    return actions.order.create({
      purchase_units: [{
        amount: { value: total.toFixed(2) }
      }]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then((details) => {
      clearCart();
      alert(`Transaction completed by ${details.payer.name.given_name}`);
    });
  }
}).render('#paypal-button-container');
```

---

## 3. SEO & Structured Data (Schema.org)

To maximize Google search visibility:
- Update `sitemap.xml` with your live domain name.
- Customize Open Graph `<meta property="og:url">` in the `<head>` of each HTML file.
- Product structured data is ready to be embedded as `<script type="application/ld+json">` on `product-details.html`:

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Mammoth California Roasted Almonds",
  "image": [
    "https://yourdomain.com/assets/images/products/prod_almonds_california.webp"
  ],
  "description": "Slow dry-roasted colossal California almonds with paper skins and sea salt.",
  "brand": {
    "@type": "Brand",
    "name": "Natuva Gourmet"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://yourdomain.com/product-details.html",
    "priceCurrency": "USD",
    "price": "24.00",
    "availability": "https://schema.org/InStock"
  }
}
```
