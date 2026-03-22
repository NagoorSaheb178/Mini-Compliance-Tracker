import TaskCard from './TaskCard';

export default function TaskList({ tasks, onStatusChange, onAddClick }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center transition-all">
                <p className="text-zinc-500 dark:text-zinc-400 mb-5 font-medium">No tasks yet for this client.</p>
                <button
                    onClick={onAddClick}
                    className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow dark:bg-zinc-100 dark:text-zinc-900"
                >
                    Add Your First Task
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <TaskCard key={task._id} task={task} onStatusChange={onStatusChange} />
            ))}
        </div>
    );
}
