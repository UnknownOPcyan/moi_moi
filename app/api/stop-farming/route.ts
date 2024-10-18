import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { telegramId } = await req.json();

        if (!telegramId) {
            return NextResponse.json({ error: 'Invalid telegramId' }, { status: 400 });
        }

        // Find the user and the farming record
        const user = await prisma.user.findUnique({
            where: { telegramId }
        });

        const farmingRecord = await prisma.farmingPoint.findUnique({
            where: { telegramId }
        });

        if (!user || !farmingRecord || !farmingRecord.farmStartTime) {
            return NextResponse.json({ error: 'User not farming' }, { status: 400 });
        }

        const farmingDuration = Math.min(60, Math.floor((new Date().getTime() - farmingRecord.farmStartTime.getTime()) / 1000));
        const farmedAmount = Math.floor(farmingDuration / 2) * 0.5;

        // Update both the farming points and user's total points
        await prisma.farmingPoint.update({
            where: { telegramId },
            data: { 
                points: { increment: farmedAmount },
                farmStartTime: null
            }
        });

        await prisma.user.update({
            where: { telegramId },
            data: {
                points: { increment: farmedAmount },
                farmAmount: { increment: farmedAmount }
            }
        });

        return NextResponse.json({ success: true, farmedAmount });
    } catch (error) {
        console.error('Error stopping farming:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}