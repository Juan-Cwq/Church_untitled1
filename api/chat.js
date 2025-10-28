// Serverless API endpoint for chatbot
// This runs on Vercel's backend, keeping the API key secure

module.exports = async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('Chat API called');
        console.log('Request method:', req.method);
        console.log('Request body:', req.body);
        
        const { message } = req.body;

        if (!message) {
            console.error('No message provided');
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Message received:', message);

        // Get API key from environment variable
        const apiKey = process.env.GEMINI_API_KEY;
        
        console.log('API key exists:', !!apiKey);
        console.log('API key length:', apiKey ? apiKey.length : 0);
        
        if (!apiKey) {
            console.error('GEMINI_API_KEY not found in environment variables');
            console.error('Available env vars:', Object.keys(process.env));
            return res.status(500).json({ error: 'API key not configured' });
        }

        // Church context
        const context = `You are a helpful assistant for Cornerstone Miami Church, a bilingual Christian church in Miami, FL. 
        The church is located at 5400 SW 122nd Ave, Miami, FL 33175. 
        Service times are Sunday mornings at 9:30am.
        The church offers various ministries including Church Groups, Women's Ministry, Young Adults, Youth, and Kids programs.
        Be friendly, helpful, and provide accurate information about the church when asked.
        If you don't know something specific about the church, be honest and suggest they contact the church directly at (305) 773-6148 or info@cm.church.`;

        // Call Gemini API
        const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: `${context}\n\nUser question: ${message}`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API error:', response.status, errorData);
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response from Gemini API');
        }

        const aiResponse = data.candidates[0].content.parts[0].text;

        return res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error('Chat API error:', error);
        console.error('Error stack:', error.stack);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        return res.status(500).json({ 
            error: 'Failed to process message',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
