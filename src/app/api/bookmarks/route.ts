import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserBookmarks, addBookmark, removeBookmark } from '@/lib/bookmark-utils';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookmarks = await getUserBookmarks(session.user.id);

    return NextResponse.json({ bookmarks }, { status: 200 });
  } catch (error) {
    console.error('GET /api/bookmarks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { hobbyId } = body;

    if (!hobbyId) {
      return NextResponse.json(
        { error: 'hobbyId is required' },
        { status: 400 }
      );
    }

    const success = await addBookmark(session.user.id, hobbyId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to add bookmark' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Bookmark added' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/bookmarks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const hobbyId = searchParams.get('hobbyId');

    if (!hobbyId) {
      return NextResponse.json(
        { error: 'hobbyId is required' },
        { status: 400 }
      );
    }

    const success = await removeBookmark(session.user.id, hobbyId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to remove bookmark' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Bookmark removed' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/bookmarks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

