import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';

export async function GET() {
    try {
        await dbConnect();
        const clients = await Client.find({}).sort({ company_name: 1 });
        return NextResponse.json({ success: true, data: clients });
    } catch (error) {
        console.error('API /clients error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch clients' }, { status: 500 });
    }
}
