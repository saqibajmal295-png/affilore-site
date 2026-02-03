const crypto = require('crypto');

// Environment variables should be used for these
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_test_verify_token';
const APP_SECRET = process.env.APP_SECRET || 'my_test_app_secret';

const verifyWebhook = (req, res) => {
  // Parse the query params
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    // Responds with '400 Bad Request' if query params are missing
    res.sendStatus(400);
  }
};

const postWebhook = (req, res) => {
  const signature = req.headers['x-hub-signature'];

  if (!signature) {
    console.error('Signature missing');
    return res.sendStatus(403);
  }

  const [method, signatureHash] = signature.split('=');

  if (method !== 'sha1' || !signatureHash) {
     console.error('Invalid signature format');
     return res.sendStatus(403);
  }

  // To verify the signature, we need the raw body.
  // Ensure that the body-parser middleware is configured to provide req.rawBody
  if (!req.rawBody) {
      console.error('req.rawBody is missing. Please configure body-parser with verify option to expose raw body.');
      return res.sendStatus(500);
  }

  const hmac = crypto.createHmac('sha1', APP_SECRET);
  hmac.update(req.rawBody);
  const digest = hmac.digest('hex');

  const digestBuffer = Buffer.from(digest, 'utf8');
  const signatureBuffer = Buffer.from(signatureHash, 'utf8');

  // Use timingSafeEqual to prevent timing attacks
  if (digestBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
    console.error('Signature verification failed');
    return res.sendStatus(403);
  }

  const body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      // Facebook can batch multiple events in the messaging array
      if (entry.messaging) {
        entry.messaging.forEach(webhook_event => {
            // Parse the sender ID
            const sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Parse message text
            if (webhook_event.message && webhook_event.message.text) {
                 console.log('Message text: ' + webhook_event.message.text);
            }
        });
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

module.exports = {
  verifyWebhook,
  postWebhook
};
