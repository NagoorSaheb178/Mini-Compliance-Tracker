import { isBefore, startOfDay } from 'date-fns';

export function isTaskOverdue(dueDate, status) {
    if (status === 'Completed') return false;

    const today = startOfDay(new Date());
    const taskDate = startOfDay(new Date(dueDate));

    return isBefore(taskDate, today);
}
