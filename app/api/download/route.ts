import { NextRequest, NextResponse } from 'next/server';
import ytdlp from 'ytdlp-nodejs';
import { PassThrough } from 'stream';

export async function POST(request: NextRequest) {
  const { url, formatId } = await request.json();

  if (!url || !formatId) {
    return NextResponse.json({ success: false, message: 'URL or formatId is missing.', errorCode: 'MISSING_PARAMS' }, { status: 400 });
  }

  try {
    const videoInfo = await ytdlp.getVideoInfo(url);
    const selectedFormat = videoInfo.formats.find((f: any) => f.format_id === formatId);

    if (!selectedFormat) {
      return NextResponse.json({ success: false, message: 'Selected format not found.', errorCode: 'FORMAT_NOT_FOUND' }, { status: 400 });
    }

    const filename = `${videoInfo.title}.${selectedFormat.ext}`;

    // Use ytdlp to download the video stream
    const videoStream = ytdlp.download(url, {
      format: formatId,
    });

    // Create a passthrough stream to pipe video data
    const passThrough = new PassThrough();
    videoStream.pipe(passThrough);

    // Set headers for direct file download
    const headers = new Headers({
      'Content-Type': selectedFormat.mime_type || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    // Return the stream as a NextResponse
    return new NextResponse(passThrough as any, { headers });
  } catch (error: any) {
    console.error('Error initiating download:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to initiate download.', errorCode: 'DOWNLOAD_ERROR' },
      { status: 500 }
    );
  }
}
