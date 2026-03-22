import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get('clientId');

        let query = {};
        if (clientId) {
            query.client_id = clientId;
        }

        const tasks = await Task.find(query).sort({ due_date: 1 });
        return NextResponse.json({ success: true, data: tasks });
    } catch (error) {
        console.error('API GET /tasks error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        const task = await Task.create(body);
        return NextResponse.json({ success: true, data: task }, { status: 201 });
    } catch (error) {
        console.error('API POST /tasks error:', error);
        return NextResponse.json({ success: false, message: error.message || 'Failed to create task' }, { status: 400 });
    }
}
