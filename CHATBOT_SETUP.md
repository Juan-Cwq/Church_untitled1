# AI Chatbot Setup Instructions

## 🔒 Secure API Key Configuration

The chatbot now uses a secure backend API to protect your Google AI API key.

### For Local Development:

1. The API key is already in your `.env` file:
   ```
   GEMINI_API_KEY=AIzaSyC5DapG3xL-Xl3lAUIFI04L5C_UBSVHRRw
   ```

2. To test locally, you'll need to run a local server:
   ```bash
   npm install -g vercel
   vercel dev
   ```

3. Open http://localhost:3000 to test the chatbot

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyC5DapG3xL-Xl3lAUIFI04L5C_UBSVHRRw`
   - **Environments:** Production, Preview, Development (select all)
4. Click **Save**
5. Redeploy your project

### How It Works:

```
User Browser → Chatbot UI → /api/chat endpoint → Google Gemini API
                                ↑
                          API key stored securely
                          on Vercel backend
```

### Security Benefits:

✅ API key never exposed in browser
✅ Can't be stolen from client-side code
✅ Rate limiting can be added
✅ Usage can be monitored
✅ Key can be rotated without code changes

### Testing:

Once deployed to Vercel:
1. Click the chat button (bottom right)
2. Ask: "What time are your services?"
3. The bot should respond with church information

### Troubleshooting:

**Error: "API key not configured"**
- Make sure you added the environment variable in Vercel
- Redeploy after adding the variable

**Error: "Failed to process message"**
- Check Vercel function logs
- Verify API key is valid
- Check Google AI Studio quota

**Chatbot doesn't appear:**
- Clear browser cache
- Check browser console for errors
- Verify chatbot.js and chatbot.css are loaded

### Files Created:

- `api/chat.js` - Serverless function (backend)
- `chatbot.js` - Frontend chatbot UI
- `chatbot.css` - Chatbot styles
- `.env` - Local environment variables (not committed to Git)
- `vercel.json` - Vercel configuration

### Support:

For issues, check:
1. Vercel deployment logs
2. Browser console (F12)
3. Network tab for API calls
