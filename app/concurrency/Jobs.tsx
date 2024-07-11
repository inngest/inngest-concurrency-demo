'use client';
import { useState, useRef, useEffect } from 'react';
import Queue, { type Job } from '@/components/Queue';
import { capFirst } from '@/utils/strings';

export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay]);
}

function useJobQueue(initialJobs: Job[] = []): [Job[], (job: Job) => void] {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  function createJob(job: Job) {}

  useTimeout(() => {
    console.log('Polling for jobs');
    const jobs;
  }, 500);

  return [jobs, createJob];
}

export default function Jobs() {
  const [users, setUsers] = useState<string[]>(['dan', 'ana']);
  const [jobs, createJob] = useJobQueue([
    { id: 'x', status: 'PENDING', user: 'dan' },
  ]);

  const aggregateJobs = jobs.reduce<{ [key: string]: Job[] }>((acc, job) => {
    if (job.user in acc) {
      acc[job.user].push(job);
    } else {
      acc[job.user] = [job];
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Jobs</h2>
      <div className="flex flex-col gap-4">
        {users.map((user, idx) => (
          <div key={user}>
            <div className="mb-2">{capFirst(user)}</div>
            {/* <div className="flex flex-row gap-8">
              <div className="flex flex-row gap-2">
                <button
                  onClick={onCreateJob.bind(null, user, 1)}
                  className="py-1 px-3 rounded-full border border-slate-500 hover:border-slate-700 hover:bg-slate-200"
                >
                  +1
                </button>
                <button
                  onClick={onCreateJob.bind(null, user, 5)}
                  className="py-1 px-3 rounded-full border border-slate-500 hover:border-slate-700 hover:bg-slate-200"
                >
                  +5
                </button>
              </div> */}

            <Queue jobs={aggregateJobs[user] || []} />
          </div>
        ))}
      </div>
    </div>
  );
}
