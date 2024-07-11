export default function Header() {
  return (
    <div className="flex flex-col gap-8 py-8 items-center">
      <h1 className="sr-only">Inngest flow control demo</h1>
      <p className="text-lg !leading-tight mx-auto max-w-xl text-center">
        <strong>Flow control</strong> visualized
      </p>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-bold">
        Multi-tenant concurrency
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );
}
