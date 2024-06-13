'use client';
import { useEffect, useState, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import { NewJob } from '@/types';
import { Tables } from '@/database.types';
import { capFirst } from '@/utils/strings';

const users = ['dan', 'sylwia', 'tony', 'ana'];

async function createJob(jobs: NewJob[]) {
  const data = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobs),
  }).then((res) => res.json());
  return data;
}

function useJobs() {
  const [jobs, setState] = useState<{ [keyof: number]: Tables<'jobs'> }>({});

  function setJobs(newJobs: Tables<'jobs'>[]) {
    const newState = newJobs.reduce<{ [key: number]: Tables<'jobs'> }>(
      (acc, job) => {
        acc[job.id] = job;
        return acc;
      },
      {}
    );
    setState(newState);
  }

  function upsertJobs(newJobs: Tables<'jobs'>[]) {
    const jobsToUpsert: { [keyof: string]: Tables<'jobs'> } = {};
    for (const job of newJobs) {
      jobsToUpsert[job.id] = job;
    }
    setState((existing) => ({ ...existing, ...jobsToUpsert }));
    console.log(
      'Update:',
      newJobs.map((j) => j.id)
    );
  }

  const supabase = createClient();

  async function fetchJobs() {
    const { data } = await supabase.from('jobs').select();
    setJobs(data || []);
  }
  async function clearJobs() {
    await supabase.from('jobs').delete().gt('id', 0);
    setJobs([]);
  }

  // Initial load
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const id = setInterval(fetchJobs, 200);
    return () => {
      clearInterval(id);
    };
  }, [fetchJobs]);

  // Realtime updates
  // useEffect(() => {
  //   console.log('subscribing to updates');
  //   const channel = supabase
  //     .channel('db')
  //     .on(
  //       'postgres_changes',
  //       { event: 'UPDATE', schema: 'public', table: 'jobs' },
  //       (payload) => {
  //         const updated = payload.new as Tables<'jobs'>;
  //         upsertJobs([updated]);
  //       }
  //     )
  //     .subscribe();
  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [supabase, jobs, setJobs]);

  return { jobs, upsertJobs, clearJobs };
}

const STATUS_SORT: { [keyof: Tables<'jobs'>['status']]: number } = {
  PENDING: 0,
  RUNNING: 1,
  COMPLETED: 2,
};

export default function Jobs() {
  const { jobs, upsertJobs, clearJobs } = useJobs();

  async function onCreateJob(user: string, count: number = 1) {
    const jobs = Array.from({ length: count }).map(() => ({
      user_slug: user,
      status: 'PENDING',
    }));

    const data = await createJob(jobs);
    upsertJobs(data);
  }

  // TODO - Sort by status
  const sortedJobs = Object.values(jobs).sort((a, b) => {
    return STATUS_SORT[a.status] > STATUS_SORT[b.status] ? -1 : 1;
  });
  const aggregateJobs = sortedJobs.reduce<{ [key: string]: Tables<'jobs'>[] }>(
    (acc, job) => {
      if (job.user_slug in acc) {
        acc[job.user_slug].push(job);
      }
      return acc;
    },
    {
      dan: [],
      tony: [],
      sylwia: [],
      ana: [],
    }
  );

  // console.log('Render', Object.keys(jobs), aggregateJobs.dan);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-8">Jobs</h2>
      <div className="flex flex-col gap-4">
        {users.map((user, idx) => (
          <div key={user}>
            <div className="mb-2">{capFirst(user)}</div>
            <div className="flex flex-row gap-8">
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
              </div>

              <div className="flex flex-row gap-2 items-center">
                {aggregateJobs[user].map((job) => {
                  return (
                    <div
                      key={`${user}-${job.id}`}
                      className={`w-8 h-8 rounded-sm ${
                        job.status === 'RUNNING'
                          ? 'animate-pulse bg-amber-500'
                          : job.status === 'COMPLETED'
                          ? 'bg-emerald-500'
                          : 'bg-cyan-400'
                      }`}
                      title={`${job.id} - ${job.status}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <button
          onClick={clearJobs}
          className="py-2 px-4 rounded-md border border-rose-600 hover:border-rose-700 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
        >
          Clear jobs
        </button>
      </div>
    </div>
  );
}
