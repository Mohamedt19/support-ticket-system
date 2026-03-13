type LoadingProps = {
    text?: string;
  };
  
  export default function Loading({
    text = "Loading...",
  }: LoadingProps) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-700 border-t-sky-500" />
          <p className="text-sm text-slate-400">{text}</p>
        </div>
      </div>
    );
  }