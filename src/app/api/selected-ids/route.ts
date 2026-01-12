import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { selectedIds } = body;

    if (!Array.isArray(selectedIds)) {
      return NextResponse.json(
        { error: 'selectedIds must be an array' },
        { status: 400 }
      );
    }

    // Mock API response
    const response = {
      success: true,
      message: `Successfully processed ${selectedIds.length} selected IDs`,
      selectedIds,
      timestamp: new Date().toISOString(),
      processingTime: '125ms',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request', details: (error as Error).message },
      { status: 500 }
    );
  }
}
