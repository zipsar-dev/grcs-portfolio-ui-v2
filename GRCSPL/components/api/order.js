export async function postorder(data) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  try {
    const response = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to register user');
    }

    const result = await response.json();

    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

export async function getorder(number) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  try {
    const response = await fetch(`${baseUrl}/api/orders/phone/+91${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to get order');
    }

    const result = await response.json();

    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
