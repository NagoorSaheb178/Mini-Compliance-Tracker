import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function PATCH(request, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        // Only allow updating status
        if (body.status === undefined) {
            return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
        }

        const task = await Task.findByIdAndUpdate(
            id,
            { status: body.status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: task });
    } catch (error) {
        console.error('API PATCH /tasks/[id] error:', error);
        return NextResponse.json({ success: false, message: 'Failed to update task' }, { status: 500 });
    }
}
