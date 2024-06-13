import { inngest } from '@/inngest';
import type { JobCreated } from '@/inngest/types';
import { createClient } from '@/utils/supabase/server';
import type { NewJob } from '@/types';

export async function POST(req: Request) {
  const jobs = (await req.json()) as NewJob[];

  const events: JobCreated[] = jobs.map((job) => ({
    name: 'demo/job.created',
    data: job,
  }));
  const { ids } = await inngest.send(events);

  const newJobs = jobs.map((job, i) => ({ ...job, event_id: ids[i] }));

  const supabase = createClient();
  const { data } = await supabase.from('jobs').insert(newJobs).select();

  return Response.json(data);
}
