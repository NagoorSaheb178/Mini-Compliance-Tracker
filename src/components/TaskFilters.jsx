import { Search } from 'lucide-react';

export default function TaskFilters({ filter, setFilter, searchQuery, setSearchQuery, sortBy, setSortBy }) {
    return (
        <div className="flex flex-col lg:flex-row w-full gap-3 sm:gap-2 lg:items-center mt-2 lg:mt-0">
            <div className="relative w-full lg:w-auto flex-1 lg:min-w-[250px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 sm:py-2 bg-white border border-zinc-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 transition-all duration-200"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full lg:w-auto">
                <select
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-white border border-zinc-300 rounded-lg text-sm sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 transition-all duration-200 hover:border-zinc-400 cursor-pointer appearance-none"
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-white border border-zinc-300 rounded-lg text-sm sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 transition-all duration-200 hover:border-zinc-400 cursor-pointer appearance-none"
                    value={filter.category}
                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                >
                    <option value="All">All Categories</option>
                    <option value="Tax">Tax</option>
                    <option value="Filing">Filing</option>
                    <option value="Audit">Audit</option>
                    <option value="Other">Other</option>
                </select>

                <select
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-white border border-zinc-300 rounded-lg text-sm sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 transition-all duration-200 hover:border-zinc-400 cursor-pointer appearance-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="due_date_asc">Earliest Due</option>
                    <option value="due_date_desc">Latest Due</option>
                    <option value="priority_desc">Highest Priority</option>
                    <option value="priority_asc">Lowest Priority</option>
                </select>
            </div>
        </div>
    );
}
