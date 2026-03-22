import { useState } from 'react';

export default function AddTaskForm({ clientId, onTaskAdded, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const initialForm = {
        title: '',
        description: '',
        category: 'Tax',
        due_date: '',
        priority: 'Medium',
    };

    const [formData, setFormData] = useState(initialForm);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, client_id: clientId }),
            });

            if (!response.ok) throw new Error('Failed to add task');

            const { data } = await response.json();

            setSuccess(true);
            setFormData(initialForm);
            onTaskAdded(data);

            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (error) {
            console.error(error);
            alert('Failed to add task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-zinc-50/50 dark:bg-zinc-900/50 p-5 sm:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8 transition-all relative overflow-hidden">

                {success && (
                    <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-sm font-bold text-center py-1.5 transform transition-transform z-10">
                        Task added successfully!
                    </div>
                )}

                <h3 className={`text-xl font-bold mb-5 text-zinc-900 dark:text-zinc-100 ${success ? 'mt-4' : ''}`}>Add New Task</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-[15px] sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Title *</label>
                        <input
                            type="text" required
                            className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm bg-white border border-zinc-300 rounded-xl shadow-sm focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all duration-200 touch-manipulation dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                            value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-[15px] sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Description</label>
                        <textarea
                            className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm bg-white border border-zinc-300 rounded-xl shadow-sm focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all duration-200 touch-manipulation dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                            rows="2"
                            value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-[15px] sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Due Date *</label>
                        <input
                            type="date" required
                            className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm bg-white border border-zinc-300 rounded-xl shadow-sm focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all duration-200 touch-manipulation dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                            value={formData.due_date} onChange={e => setFormData({ ...formData, due_date: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-[15px] sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Category *</label>
                        <select
                            className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm bg-white border border-zinc-300 rounded-xl shadow-sm focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all duration-200 touch-manipulation dark:bg-zinc-950 dark:border-zinc-800 dark:text-white appearance-none"
                            value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Tax">Tax</option>
                            <option value="Filing">Filing</option>
                            <option value="Audit">Audit</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Priority</label>
                        <select
                            className="w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-lg shadow-sm focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all dark:bg-zinc-950 dark:border-zinc-800 dark:text-white appearance-none"
                            value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full sm:w-auto px-6 py-3 sm:py-2.5 border border-zinc-300 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3 sm:py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all"
                    >
                        {loading ? 'Adding...' : 'Add Task'}
                    </button>
                </div>
            </div>
        </form>
    );
}
