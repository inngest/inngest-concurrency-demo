import { inngest } from './client';
import { createClient } from '@/utils/supabase/server';

export const multiTenantConcurrency = inngest.createFunction(
  {
    id: 'multi-tenant-concurrency',
    concurrency: [
      {
        limit: 1,
        // Limit 1 concurrent run per user
        // key: 'event.data.user_slug',
      },
      // {
      //   limit: 10,
      // },
    ],
  },
  {
    event: 'demo/job.created',
  },
  async ({ event, step }) => {
    // add artificial delay to simulate slow processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { status: 'success' };
  }
);
