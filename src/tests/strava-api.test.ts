import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';

// Strava API base URL migration timeline:
// - Current (until June 1, 2027): https://www.strava.com/api/v3
// - New (from June 1, 2027):      https://www.api-v3.strava.com
// Update this test and runs.astro together on that date.

const CURRENT_BASE_URL = 'https://www.strava.com/api/v3';
const NEW_BASE_URL = 'https://www.api-v3.strava.com';
const MIGRATION_DATE = new Date('2027-06-01');

const runsSource = readFileSync(
  resolve(process.cwd(), 'src/pages/runs.astro'),
  'utf-8'
);

describe('Strava API URL', () => {
  it('uses the correct base URL for the current date', () => {
    const now = new Date();
    if (now < MIGRATION_DATE) {
      expect(runsSource).toContain(CURRENT_BASE_URL);
      expect(runsSource).not.toContain(NEW_BASE_URL);
    } else {
      // After June 1, 2027: update runs.astro to use the new base URL
      expect(runsSource).toContain(NEW_BASE_URL);
    }
  });
});
