// services/api.js
export async function registerForNotification(data) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  try {
    const response = await fetch(`${baseUrl}/api/notify/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to register for notifications');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
