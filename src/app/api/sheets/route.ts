import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = process.env.SHEET_ID || '1OknzjjSG-uvCQ4_C09KzMt9eDX273NU3I9vwprj-LrY';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxF6Z3vx4gw9dFHtW3XmKAMeFl4jQtToDrhKqYLNjEpaHa5DHwvSp8-U_cUpjA1vW0/exec';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action = 'update', value, row } = body;
        if (!value) {
            return NextResponse.json(null, { status: 400 });
        }
        const params = new URLSearchParams({
            sheetId: SHEET_ID,
            action,
            value: JSON.stringify(value)
        });
        if (row) {
            params.append('row', row);
        }
        const response = await axios.get(`${SHEET_URL}?${params}`);
        return NextResponse.json(response.data);
    } catch {
        return NextResponse.json({ error: 'lỗi proxy' }, { status: 500 });
    }
}
