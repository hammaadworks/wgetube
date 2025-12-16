import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DownloaderPage from '../app/(main)/downloader/page';
import '@testing-library/jest-dom';

// Mock ytdlp-nodejs for API route tests
jest.mock('ytdlp-nodejs', () => ({
  getVideoInfo: jest.fn(),
  download: jest.fn(() => {
    const { PassThrough } = require('stream');
    const stream = new PassThrough();
    process.nextTick(() => {
      stream.end(Buffer.from('mock video data'));
    });
    return stream;
  }),
}));

// Mock the Next.js API routes directly for integration testing
// This is a simplified approach; in a real project, you might use MSW or a more robust mocking library
const mockFetchDetailsResponse = {
  success: true,
  details: {
    id: 'mockVideoId',
    title: 'Mock Video Title',
    thumbnailUrl: 'https://via.placeholder.com/320x180?text=Video+Thumbnail',
    duration: 300, // seconds
    availableFormats: [
      { formatId: 'bestaudio', description: 'Best Audio', ext: 'mp3', preference: 10, mime_type: 'audio/mp3' },
      { formatId: 'mp4_1080p', description: 'MP4 1080p', ext: 'mp4', preference: 5, mime_type: 'video/mp4' },
    ],
  },
};

const mockDownloadResponse = (format: string) => ({
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)), // Mock blob content
  blob: () => Promise.resolve(new Blob(['mock video data'], { type: format === 'mp4_1080p' ? 'video/mp4' : 'audio/mp3' })),
  ok: true,
  headers: new Headers({'Content-Type': format === 'mp4_1080p' ? 'video/mp4' : 'audio/mp3', 'Content-Disposition': `attachment; filename="test-video.${format === 'mp4_1080p' ? 'mp4' : 'mp3'}"`}),
});


global.fetch = jest.fn((input: RequestInfo | URL) => {
  if (typeof input === 'string' && input.startsWith('/api/fetch-details')) {
    return Promise.resolve({
      ok: true,
      json: async () => mockFetchDetailsResponse,
    }) as Promise<Response>;
  }
  if (typeof input === 'string' && input.startsWith('/api/download')) {
    const url = new URL(input, 'http://localhost'); // Create a full URL object for parsing
    const formatId = url.searchParams.get('formatId');
    return Promise.resolve(mockDownloadResponse(formatId || '')) as Promise<Response>;
  }
  // Fallback for other fetches if any
  return Promise.resolve({ ok: true, json: async () => ({}) }) as Promise<Response>;
});


// Mock window.showSaveFilePicker
const mockShowSaveFilePicker = jest.fn(() => ({
  createWritable: jest.fn(() => ({
    write: jest.fn(),
    close: jest.fn(),
  })),
}));

Object.defineProperty(window, 'showSaveFilePicker', {
  writable: true,
  value: mockShowSaveFilePicker,
});

describe('DownloaderPage - Client-side URL Validation', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (mockShowSaveFilePicker as jest.Mock).mockClear();
    global.confirm = jest.fn(() => true); // Default to confirming file save
    global.alert = jest.fn(); // Mock alert
  });

  it('should display an error for an invalid YouTube URL', async () => {
    render(<DownloaderPage />);

    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    fireEvent.change(urlInput, { target: { value: 'invalid-youtube-link' } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid YouTube or Instagram Reels URL.');
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should display an error for an invalid Instagram Reels URL', async () => {
    render(<DownloaderPage />);

    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    fireEvent.change(urlInput, { target: { value: 'invalid-instagram-link' } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid YouTube or Instagram Reels URL.');
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should call fetch-details API for a valid YouTube URL', async () => {
    render(<DownloaderPage />);
    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    const validYoutubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    fireEvent.change(urlInput, { target: { value: validYoutubeUrl } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`/api/fetch-details?url=${encodeURIComponent(validYoutubeUrl)}`);
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should call fetch-details API for a valid Instagram Reels URL', async () => {
    render(<DownloaderPage />);
    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    const validInstagramUrl = 'https://www.instagram.com/reels/CgX_Xk4g_Bv/';
    fireEvent.change(urlInput, { target: { value: validInstagramUrl } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`/api/fetch-details?url=${encodeURIComponent(validInstagramUrl)}`);
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should handle API error gracefully when fetching details', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Video not found.' }),
    });

    render(<DownloaderPage />);
    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    const validYoutubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    fireEvent.change(urlInput, { target: { value: validYoutubeUrl } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Video not found.');
    });
  });
});

describe('DownloaderPage - Integration Tests (UI to API)', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (mockShowSaveFilePicker as jest.Mock).mockClear();
    global.confirm = jest.fn(() => true);
    global.alert = jest.fn();
  });

  it('should display video details after fetching', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFetchDetailsResponse,
    });

    render(<DownloaderPage />);
    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByText('Video Details')).toBeInTheDocument();
      expect(screen.getByText('Mock Video Title')).toBeInTheDocument();
      expect(screen.getByText('Duration: 5m 0s')).toBeInTheDocument();
      expect(screen.getByText('MP4 1080p (mp4)')).toBeInTheDocument();
    });
  });

  it('should initiate download and use File System Access API if supported and confirmed', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockFetchDetailsResponse,
      })
      .mockResolvedValueOnce(mockDownloadResponse('mp4_1080p'));

    render(<DownloaderPage />);
    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByText('Video Details')).toBeInTheDocument();
    });

    const downloadButton = screen.getByRole('button', { name: 'Download Selected' });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalledWith(expect.stringContaining('File System Access API'));
      expect(mockShowSaveFilePicker).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Video saved to your selected location!');
    });
    expect(fetch).toHaveBeenCalledTimes(2); // One for details, one for download
  });

  it('should fallback to browser default download if File System Access API is denied', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockFetchDetailsResponse,
      })
      .mockResolvedValueOnce(mockDownloadResponse('mp4_1080p'));

    global.confirm = jest.fn(() => false); // User denies consent for File System Access API

    render(<DownloaderPage />);
    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByText('Video Details')).toBeInTheDocument();
    });

    const downloadButton = screen.getByRole('button', { name: 'Download Selected' });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(global.confirm).toHaveBeenCalledWith(expect.stringContaining('File System Access API'));
      expect(mockShowSaveFilePicker).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Download initiated! Check your browser downloads.');
    });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should handle API error gracefully when initiating download', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockFetchDetailsResponse,
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false, message: 'Download failed on server.' }),
      });

    render(<DownloaderPage />);
    const urlInput = screen.getByPlaceholderText('Paste YouTube or Instagram Reels URL here');
    const fetchButton = screen.getByRole('button', { name: 'Fetch Details' });

    fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByText('Video Details')).toBeInTheDocument();
    });

    const downloadButton = screen.getByRole('button', { name: 'Download Selected' });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Download failed on server.');
    });
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});