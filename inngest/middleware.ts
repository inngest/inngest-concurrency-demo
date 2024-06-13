import { InngestMiddleware } from 'inngest';
import { createClient } from '@/utils/supabase/server';

export const supabaseJobMiddleware = new InngestMiddleware({
  name: 'Track jobs in Supabase',
  init: () => {
    return {
      onFunctionRun: async ({ ctx }) => {
        const supabase = createClient();
        await supabase
          .from('jobs')
          .update({ status: 'RUNNING', run_id: ctx.runId })
          .eq('event_id', ctx.event.id || '');

        return {
          async afterExecution() {
            await supabase
              .from('jobs')
              .update({ status: 'COMPLETED' })
              .eq('run_id', ctx.runId);
          },
        };
      },
    };
  },
});
