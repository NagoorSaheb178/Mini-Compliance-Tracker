import { isTaskOverdue } from '@/utils/overdueCheck';
import { format } from 'date-fns';
import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TaskCard({ task, onStatusChange }) {
    const isOverdue = isTaskOverdue(task.due_date, task.status);
    const isCompleted = task.status === 'Completed';

    const handleToggle = () => {
        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        onStatusChange(task._id, newStatus);
    };

    return (
        <div className={`group p-4 sm:p-5 rounded-xl border shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] touch-manipulation ${isCompleted ? 'opacity-70 bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:opacity-100' : isOverdue ? 'border-red-300 bg-red-50/80 dark:bg-red-950/30 dark:border-red-900/50 hover:border-red-400 dark:hover:border-red-800' : 'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                    <h4 className={`font-semibold text-lg flex items-center gap-2 ${isCompleted ? 'line-through text-zinc-500 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'}`}>
                        {isOverdue && !isCompleted && <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />}
                        {task.title}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{task.category} • {task.priority} Priority</p>
                </div>
                <button
                    onClick={handleToggle}
                    className={`px-4 py-2 sm:py-1.5 rounded-full text-sm sm:text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 w-full sm:w-auto justify-center sm:justify-start ${task.status === 'Completed' ? 'bg-green-100/80 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-800/60' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`}
                >
                    {task.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
                    {task.status}
                </button>
            </div>

            {task.description && (
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">{task.description}</p>
            )}

            <div className={`flex flex-wrap items-center gap-y-2 mt-4 text-sm sm:text-xs font-medium ${isOverdue ? 'text-red-700 dark:text-red-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </div>
                {isOverdue && <span className="ml-auto sm:ml-3 px-2 py-0.5 rounded-md text-[10px] sm:text-xs bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 font-bold uppercase tracking-wider border border-red-200 dark:border-red-800">Overdue</span>}
            </div>
        </div>
    );
}
