// api/verify.js
export default async function handler(req, res) {
  // Set CORS headers for local development
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Support both JSON bodies and URL encoded forms
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // Not JSON
    }
  }

  const license_key = body?.license_key;
  const product_id = 'SIR69VLOJD4Yf0h7KynPbw==';

  if (!license_key) {
    return res.status(400).json({ success: false, message: 'License key is required.' });
  }

  try {
    const gumroadResponse = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        product_id: product_id,
        license_key: license_key,
      }),
    });

    const data = await gumroadResponse.json();

    if (gumroadResponse.ok && data.success) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json({
        success: false,
        message: data.message || 'Invalid license key. Make sure to copy the exact key from your Gumroad receipt.',
      });
    }
  } catch (error) {
    console.error('Gumroad API proxy error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify license key with Gumroad. Please try again later.',
    });
  }
}
