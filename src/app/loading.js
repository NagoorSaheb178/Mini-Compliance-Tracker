export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-zinc-900 animate-spin dark:border-zinc-800 dark:border-t-zinc-100 mb-4" />
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse uppercase tracking-widest">
                Loading...
            </p>
        </div>
    );
}
