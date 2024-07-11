import Header from '@/components/Header';
import Jobs from './Jobs';

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col 8 opacity-0 max-w-screen-xl w-full px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <Jobs />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://www.inngest.com"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Inngest
          </a>
        </p>
      </footer>
    </div>
  );
}
