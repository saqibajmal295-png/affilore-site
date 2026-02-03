const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { verifyWebhook, postWebhook } = require('../controllers/webhookController');

const app = express();
const PORT = 3000;

// Need to capture raw body for signature verification
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.get('/webhook', verifyWebhook);
app.post('/webhook', postWebhook);

const server = app.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);

  try {
      await runTests();
  } catch (e) {
      console.error("Tests failed", e);
      process.exit(1);
  } finally {
      server.close();
  }
});

const APP_SECRET = process.env.APP_SECRET || 'my_test_app_secret';
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_test_verify_token';

async function runTests() {
    // 1. Test GET /webhook verification success
    console.log("Test 1: GET Verification Success");
    const challenge = '12345';
    const verifyUrl = `http://localhost:${PORT}/webhook?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=${challenge}`;
    const res1 = await fetch(verifyUrl);
    if (res1.status === 200) {
        const text = await res1.text();
        if (text === challenge) {
            console.log("PASS");
        } else {
            console.error(`FAIL: Expected ${challenge}, got ${text}`);
            process.exit(1);
        }
    } else {
        console.error(`FAIL: Status ${res1.status}`);
        process.exit(1);
    }

    // 2. Test GET /webhook verification failure (wrong token)
    console.log("Test 2: GET Verification Failure (wrong token)");
    const badVerifyUrl = `http://localhost:${PORT}/webhook?hub.mode=subscribe&hub.verify_token=WRONG&hub.challenge=${challenge}`;
    const res2 = await fetch(badVerifyUrl);
    if (res2.status === 403) {
        console.log("PASS");
    } else {
        console.error(`FAIL: Expected 403, got ${res2.status}`);
        process.exit(1);
    }

    // 3. Test POST /webhook message handling success
    console.log("Test 3: POST Message Success");
    const bodyObj = {
        object: 'page',
        entry: [{
            messaging: [{
                sender: { id: 'sender_123' },
                message: { text: 'Hello World' }
            }]
        }]
    };
    const bodyJson = JSON.stringify(bodyObj);
    const hmac = crypto.createHmac('sha1', APP_SECRET);
    hmac.update(bodyJson);
    const signature = `sha1=${hmac.digest('hex')}`;

    const res3 = await fetch(`http://localhost:${PORT}/webhook`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Hub-Signature': signature
        },
        body: bodyJson
    });

    if (res3.status === 200) {
        console.log("PASS");
    } else {
        console.error(`FAIL: Expected 200, got ${res3.status}`);
        process.exit(1);
    }

    // 4. Test POST /webhook signature failure
    console.log("Test 4: POST Signature Failure");
    const res4 = await fetch(`http://localhost:${PORT}/webhook`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Hub-Signature': 'sha1=invalidhash'
        },
        body: bodyJson
    });

    if (res4.status === 403) {
        console.log("PASS");
    } else {
        console.error(`FAIL: Expected 403, got ${res4.status}`);
        process.exit(1);
    }

    console.log("ALL TESTS PASSED");
}
