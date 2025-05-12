// pages/api/ordercloud.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId } = req.body;

    try {
      // Read environment variables from Vercel's settings
      const ORDERCLOUD_API_URL = process.env.ORDERCLOUD_API_URL;
      const CLIENT_ID = process.env.ORDERCLOUD_CLIENT_ID;
      const CLIENT_SECRET = process.env.ORDERCLOUD_CLIENT_SECRET;

      // Make a GET request to OrderCloud to fetch the order by ID
      const response = await fetch(`${ORDERCLOUD_API_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CLIENT_ID}:${CLIENT_SECRET}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);  // Return the OrderCloud data as JSON
      } else {
        res.status(response.status).json({ message: 'Error fetching order' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // Handle unsupported HTTP methods (e.g., GET, PUT, etc.)
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
