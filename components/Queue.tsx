export type Job = {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED';
  user: string;
  time: Date;
};

export default function Queue({ jobs }: { jobs: Job[] }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      {jobs.map(({ id, status }) => {
        return (
          <div
            key={id}
            className={`w-8 h-8 rounded-sm ${
              status === 'RUNNING'
                ? 'animate-pulse bg-amber-500'
                : status === 'COMPLETED'
                ? 'bg-emerald-500'
                : 'bg-cyan-400'
            }`}
            title={`${id} - ${status}`}
          ></div>
        );
      })}
    </div>
  );
}
