'use client';
import { useState } from 'react';
import TaskList from '@/components/TaskList';
import AddTaskForm from '@/components/AddTaskForm';
import TaskFilters from '@/components/TaskFilters';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { isTaskOverdue } from '@/utils/overdueCheck';

export default function ClientTaskView({ client, initialTasks }) {
    const [tasks, setTasks] = useState(initialTasks);
    const [showAddForm, setShowAddForm] = useState(false);
    const [filter, setFilter] = useState({ status: 'All', category: 'All' });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('due_date_asc');

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    const overdueTasks = tasks.filter(t => isTaskOverdue(t.due_date, t.status)).length;

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask].sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
        setShowAddForm(false);
    };

    const handleStatusChange = async (taskId, newStatus) => {
        // Optimistic update
        setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));

        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (!res.ok) throw new Error('Failed to update status');
        } catch (e) {
            console.error(e);
            // Revert optimism if failed (simplified fetch refetching)
            const res = await fetch(`/api/tasks?clientId=${client._id}`);
            if (res.ok) {
                const { data } = await res.json();
                setTasks(data);
            }
        }
    };

    const filteredTasks = tasks.filter(task => {
        let match = true;

        // existing filters
        if (filter.status !== 'All' && task.status !== filter.status) match = false;
        if (filter.category !== 'All' && task.category !== filter.category) match = false;

        // search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const titleMatch = task.title.toLowerCase().includes(query);
            const descMatch = task.description ? task.description.toLowerCase().includes(query) : false;
            if (!titleMatch && !descMatch) match = false;
        }

        return match;
    }).sort((a, b) => {
        const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };

        if (sortBy === 'due_date_asc') return new Date(a.due_date) - new Date(b.due_date);
        if (sortBy === 'due_date_desc') return new Date(b.due_date) - new Date(a.due_date);
        if (sortBy === 'priority_desc') return priorityWeight[b.priority] - priorityWeight[a.priority];
        if (sortBy === 'priority_asc') return priorityWeight[a.priority] - priorityWeight[b.priority];

        return 0;
    });

    return (
        <div className="space-y-6">
            <div>
                <Link href="/clients" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Clients
                </Link>
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">{client.company_name}</h2>
                        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">{client.entity_type}</span>
                            <span>{client.country}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="inline-flex items-center justify-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Task
                    </button>
                </div>
            </div>

            {showAddForm && (
                <AddTaskForm
                    clientId={client._id}
                    onTaskAdded={handleTaskAdded}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 mt-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalTasks}</span>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">Total Tasks</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{pendingTasks}</span>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">Pending</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                    <span className={`text-2xl font-bold ${overdueTasks > 0 ? 'text-red-600 dark:text-red-400' : 'text-zinc-900 dark:text-zinc-100'}`}>{overdueTasks}</span>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">Overdue</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    Tasks
                    <span className="text-sm font-normal text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                        {filteredTasks.length}
                    </span>
                </h3>
                <TaskFilters
                    filter={filter}
                    setFilter={setFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </div>

            <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} onAddClick={() => setShowAddForm(true)} />
        </div>
    );
}
