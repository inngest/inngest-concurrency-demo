import { Tables } from '@/database.types';

type Job = Tables<'jobs'>;
export type NewJob = Omit<Job, 'id' | 'event_id' | 'run_id'>;
