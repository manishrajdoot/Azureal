<<<<<<< HEAD
# Instructions for Deploying Azureal on GitHub Pages

## Problem
If your application is not working after hosting on GitHub Pages, it may primarily be due to the socket connection URL that is set to `localhost:3001`, which is not available on GitHub Pages.

## Solution
The following changes have been made to solve this problem:

### 1. Socket Connection URL Made Dynamic
The socket connection URL in the `script.js` file has been updated to automatically change according to the environment:

```javascript
// Dynamic URL - Will connect according to local or production environment
=======
# GitHub Pages पर Azureal को डिप्लॉय करने के निर्देश

## समस्या
GitHub Pages पर होस्ट करने के बाद अगर आपका एप्लिकेशन काम नहीं कर रहा है, तो यह मुख्य रूप से सॉकेट कनेक्शन URL के कारण हो सकता है जो `localhost:3001` पर सेट है, जो GitHub Pages पर उपलब्ध नहीं है।

## समाधान
इस समस्या को हल करने के लिए निम्न परिवर्तन किए गए हैं:

### 1. सॉकेट कनेक्शन URL को डायनामिक बनाया गया है
`script.js` फाइल में सॉकेट कनेक्शन URL को अपडेट किया गया है ताकि यह वातावरण के अनुसार स्वचालित रूप से बदल जाए:

```javascript
// डायनामिक URL - लोकल या प्रोडक्शन वातावरण के अनुसार कनेक्ट करेगा
>>>>>>> c36da8c99e8900fe4c911f5b3b382ff4ed279e96
const socketURL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : window.location.origin;
socket = io(socketURL);
```

<<<<<<< HEAD
### 2. Server CORS Settings Updated
CORS settings in the `server.js` file have been updated to allow connections from all domains:
=======
### 2. सर्वर CORS सेटिंग्स को अपडेट किया गया है
`server.js` फाइल में CORS सेटिंग्स को अपडेट किया गया है ताकि यह सभी डोमेन से कनेक्शन की अनुमति दे:
>>>>>>> c36da8c99e8900fe4c911f5b3b382ff4ed279e96

```javascript
const io = socketIo(server, {
    cors: { 
<<<<<<< HEAD
        origin: "*", // Allows connections from all domains
=======
        origin: "*", // सभी डोमेन से कनेक्शन की अनुमति देता है
>>>>>>> c36da8c99e8900fe4c911f5b3b382ff4ed279e96
        methods: ["GET", "POST"] 
    }
});
```

<<<<<<< HEAD
## Additional Instructions for Deployment on GitHub Pages

### Server Setup
GitHub Pages only hosts static files, not backend servers. You will need to host your server separately:

1. Deploy your server code (server.js and necessary dependencies) on Heroku, Glitch, Render, or any other cloud platform.
2. Note the server URL (example: `https://your-app-name.herokuapp.com`).
3. If necessary, update the socket connection URL in `script.js` to match your hosted server's URL.

### Client Setup
1. Go to your GitHub repository.
2. Go to Settings > Pages.
3. In the Source section, set Branch to `main` (or your main branch) and folder to `/docs` or `/`.
4. Click the Save button.

### Additional Troubleshooting Tips

1. **HTTPS Requirement**: GitHub Pages uses HTTPS, so make sure your server also supports HTTPS.

2. **Mixed Content**: If your client is on HTTPS but the server is on HTTP, the browser will block mixed content. Make sure both use HTTPS.

3. **Socket.io Client**: Make sure Socket.io client script is included in your HTML and it is loading from the correct URL.

4. **Browser Console**: Check the browser console for any errors and troubleshoot accordingly.
=======
## GitHub Pages पर डिप्लॉयमेंट के लिए अतिरिक्त निर्देश

### सर्वर सेटअप
GitHub Pages केवल स्टैटिक फाइलें होस्ट करता है, बैकएंड सर्वर नहीं। आपको अपने सर्वर को अलग से होस्ट करना होगा:

1. अपने सर्वर कोड (server.js और आवश्यक निर्भरताएँ) को Heroku, Glitch, Render, या किसी अन्य क्लाउड प्लेटफॉर्म पर डिप्लॉय करें।
2. सर्वर URL को नोट करें (उदाहरण: `https://your-app-name.herokuapp.com`)।
3. यदि आवश्यक हो, तो `script.js` में सॉकेट कनेक्शन URL को अपडेट करें ताकि यह आपके होस्टेड सर्वर के URL से मेल खाए।

### क्लाइंट सेटअप
1. अपने GitHub रिपॉजिटरी में जाएँ।
2. Settings > Pages पर जाएँ।
3. Source सेक्शन में, Branch को `main` (या आपकी मुख्य शाखा) और फोल्डर को `/docs` या `/` पर सेट करें।
4. Save बटन पर क्लिक करें।

### अतिरिक्त समस्या निवारण टिप्स

1. **HTTPS आवश्यकता**: GitHub Pages HTTPS का उपयोग करता है, इसलिए सुनिश्चित करें कि आपका सर्वर भी HTTPS का समर्थन करता है।

2. **मिक्स्ड कंटेंट**: यदि आपका क्लाइंट HTTPS पर है लेकिन सर्वर HTTP पर है, तो ब्राउज़र मिक्स्ड कंटेंट को ब्लॉक कर देगा। सुनिश्चित करें कि दोनों HTTPS का उपयोग करते हैं।

3. **Socket.io क्लाइंट**: सुनिश्चित करें कि आपके HTML में Socket.io क्लाइंट स्क्रिप्ट शामिल है और यह सही URL से लोड हो रही है।

4. **ब्राउज़र कंसोल**: किसी भी त्रुटि के लिए ब्राउज़र कंसोल की जांच करें और उसके अनुसार समस्या का निवारण करें।
>>>>>>> c36da8c99e8900fe4c911f5b3b382ff4ed279e96
