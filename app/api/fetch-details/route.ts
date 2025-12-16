import { NextRequest, NextResponse } from 'next/server';
import ytdlp from 'ytdlp-nodejs';

// Basic URL validation regex (can be expanded)
const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?v=[a-zA-Z0-9_-]+(&\S*)?$/;
const INSTAGRAM_REELS_URL_REGEX = /^(https?:\/\/)?(www\.)?(instagram\.com)\/reels\/[a-zA-Z0-9_-]+\/?$/;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ success: false, message: 'URL parameter is missing.', errorCode: 'URL_MISSING' }, { status: 400 });
  }

  // Server-side URL validation
  if (!YOUTUBE_URL_REGEX.test(url) && !INSTAGRAM_REELS_URL_REGEX.test(url)) {
    return NextResponse.json({ success: false, message: 'Invalid video URL provided.', errorCode: 'INVALID_URL' }, { status: 400 });
  }

  try {
    // Fetch video metadata using ytdlp-nodejs
    const videoInfo = await ytdlp.getInfoAsync(url);

    // Extract relevant details for the client
    const details = {
      id: videoInfo.id,
      title: videoInfo.title,
      thumbnailUrl: videoInfo.thumbnail,
      duration: videoInfo.duration,
      availableFormats: videoInfo.formats.map((format: any) => ({
        formatId: format.format_id,
        description: format.format_note || format.ext,
        ext: format.ext,
        preference: format.preference || 0, // Lower preference means higher quality usually
      })).sort((a: any, b: any) => a.preference - b.preference), // Sort by preference
    };

    return NextResponse.json({ success: true, details });
  } catch (error: any) {
    console.error('Error fetching video details:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch video details.', errorCode: 'FETCH_ERROR' },
      { status: 500 }
    );
  }
}
