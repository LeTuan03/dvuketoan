import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Mock auth check for simplicity in standalone routes
const checkAuth = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'VTAX-dev-token';
  return authHeader === `Bearer ${expectedToken}`;
};

export async function GET(request: Request) {
  try {
    const items = await prisma.lookupItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Convert BigInt to string for JSON serialization
    const serialized = JSON.parse(JSON.stringify(items, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Error fetching lookup items:', error);
    return NextResponse.json({ error: 'Failed to fetch lookup items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, data } = body;

    let result;
    if (action === 'create') {
      result = await prisma.lookupItem.create({ data });
    } else if (action === 'update') {
      const { id, ...updateData } = data;
      result = await prisma.lookupItem.update({
        where: { id: BigInt(id) },
        data: updateData
      });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    revalidatePath('/');
    return NextResponse.json({ success: true, id: result.id.toString() });
  } catch (error) {
    console.error('Error in POST lookup item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await prisma.lookupItem.delete({
      where: { id: BigInt(id) }
    });

    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE lookup item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
