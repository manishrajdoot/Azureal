# Instructions for Deploying Azureal on GitHub Pages

## Problem
If your application is not working after hosting on GitHub Pages, it may primarily be due to the socket connection URL that is set to `localhost:3001`, which is not available on GitHub Pages.

## Solution
The following changes have been made to solve this problem:

### 1. Socket Connection URL Made Dynamic
The socket connection URL in the `script.js` file has been updated to automatically change according to the environment:

```javascript
// Dynamic URL - Will connect according to local or production environment
const socketURL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : window.location.origin;
socket = io(socketURL);
```

### 2. Server CORS Settings Updated
CORS settings in the `server.js` file have been updated to allow connections from all domains:

```javascript
const io = socketIo(server, {
    cors: { 
        origin: "*", // Allows connections from all domains
        methods: ["GET", "POST"] 
    }
});
```

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