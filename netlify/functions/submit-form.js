const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const data = JSON.parse(event.body);
        // Simulate email notification (e.g., via SendGrid)
        await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalizations: [{ to: [{ email: 'contact@slctiling.co.uk' }] }],
                from: { email: 'no-reply@slctiling.co.uk' },
                subject: `New ${data['form-name']} Submission`,
                content: [{ type: 'text/plain', value: JSON.stringify(data, null, 2) }]
            })
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Form submitted successfully!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing form.' })
        };
    }
};
