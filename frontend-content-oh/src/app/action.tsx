'use server';

const token = process.env.TOKEN_CLIP

export async function GetProducts() {
  const res = await fetch('http://localhost:3000/products/public', {
    method: 'GET',
  }).then(data => data.json()).catch(err => console.log(err));

  return res;
}

export async function Checkout(amount: number) {
    const raw = JSON.stringify({
      amount: amount,
      currency: "MXN",
      purchase_description: "Compra via Clip",
      redirection_url: {
        success: "http://localhost:3001/",
        error: "http://localhost:3001/",
        default: "http://localhost:3001/",
      },
    });
  
    const res = await fetch('https://api.payclip.com/v2/checkout', {
      method: 'POST',
      headers: {
        'Authorization':  token!,
        'Content-Type': 'application/json',
      },
      body: raw,
    });
  
    const data = await res.json();

    console.log(data)
  
    return data.payment_request_url;
} 