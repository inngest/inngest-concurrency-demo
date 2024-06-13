import { NewJob } from '@/types';

export type JobCreated = {
  name: 'demo/job.created';
  data: NewJob;
};
