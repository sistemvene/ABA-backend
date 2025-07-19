import request from 'supertest';
import express from 'express';

describe('Healthcheck /healthz', () => {
  let app;

  beforeAll(() => {
    // montar un express mínimo
    app = express();
    app.get('/healthz', (_req, res) => res.json({ ok: true }));
  });

  it('should return OK true', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
