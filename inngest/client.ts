import { Inngest, EventSchemas } from 'inngest';
import { supabaseJobMiddleware } from './middleware';

import type { JobCreated } from './types';

export const inngest = new Inngest({
  id: 'flow-control-demo',
  schemas: new EventSchemas().fromUnion<JobCreated>(),
  middleware: [supabaseJobMiddleware],
});
