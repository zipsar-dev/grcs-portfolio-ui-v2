export async function sendOrderConfirmationEmail(orderData) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const response = await fetch(`${baseUrl}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to send email:', errorText);
            return;
        }

        return await response.json();
    } catch (error) {
        console.error('Email API error:', error);
    }
}
