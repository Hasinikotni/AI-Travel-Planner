import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const DEFAULT_N8N_URL = 'https://hasinigirl.app.n8n.cloud/form/cc03ab0d-65c6-4f47-bb8a-3f876bcd44f0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    defaultN8nUrl: DEFAULT_N8N_URL
  });
});

// Test connection to n8n form
app.get('/api/test-n8n', async (req: Request, res: Response) => {
  const targetUrl = (req.query.url as string) || DEFAULT_N8N_URL;
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (AI-Travel-Planner/1.0)',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const latency = Date.now() - startTime;
    const isOk = response.status >= 200 && response.status < 400;

    res.json({
      success: isOk,
      statusCode: response.status,
      statusText: response.statusText,
      latencyMs: latency,
      url: targetUrl,
      verifiedFields: ['Starting Location (field-0)', 'Destination (field-1)', 'Number of Days (field-2)', 'Number of Travelers (field-3)', 'Budget (field-4)', 'Email (field-5)'],
    });
  } catch (error: any) {
    res.status(502).json({
      success: false,
      error: error?.message || 'Failed to ping n8n form endpoint',
      url: targetUrl,
    });
  }
});

// Submit trip planning request to n8n
app.post('/api/plan-trip', async (req: Request, res: Response) => {
  const {
    startingLocation,
    destination,
    numberOfDays,
    numberOfTravelers,
    budget,
    email,
    n8nUrl = DEFAULT_N8N_URL,
    preferences,
  } = req.body;

  // Validate required fields
  if (!startingLocation || !destination || !numberOfDays || !numberOfTravelers || !budget || !email) {
    res.status(400).json({
      success: false,
      error: 'All fields (Starting Location, Destination, Number of Days, Travelers, Budget, and Email) are required.',
    });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
    return;
  }

  const endpoint = typeof n8nUrl === 'string' && n8nUrl.trim().length > 0 ? n8nUrl.trim() : DEFAULT_N8N_URL;

  try {
    // Construct FormData matching n8n form field names
    const formData = new FormData();
    formData.append('field-0', String(startingLocation).trim());
    formData.append('field-1', String(destination).trim());
    formData.append('field-2', String(numberOfDays).trim());
    formData.append('field-3', String(numberOfTravelers).trim());
    formData.append('field-4', String(budget).trim());
    formData.append('field-5', String(email).trim());

    // If user provided extra travel notes/preferences, we can also append
    if (preferences) {
      formData.append('field-preferences', String(preferences).trim());
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const responseText = await response.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // response might be html or text
    }

    if (response.ok) {
      res.json({
        success: true,
        message: 'Your travel requirements have been successfully submitted to n8n!',
        n8nStatus: response.status,
        submittedData: {
          startingLocation,
          destination,
          numberOfDays: Number(numberOfDays),
          numberOfTravelers: Number(numberOfTravelers),
          budget: Number(budget),
          email,
          preferences,
          submittedAt: new Date().toISOString(),
        },
        n8nResponse: responseJson || responseText.slice(0, 500),
      });
    } else {
      res.status(response.status).json({
        success: false,
        error: `n8n returned HTTP ${response.status}`,
        details: responseText.slice(0, 300),
      });
    }
  } catch (error: any) {
    console.error('Error forwarding to n8n:', error);
    res.status(500).json({
      success: false,
      error: error?.name === 'AbortError' ? 'Request to n8n timed out after 15 seconds' : error?.message || 'Internal error dispatching to n8n',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (isProduction: ${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
