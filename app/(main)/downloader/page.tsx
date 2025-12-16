"use client";
import { useState } from 'react';

export default function DownloaderPage() {
    const [videoDetails, setVideoDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<any>(null);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [isDownloading, setIsDownloading] = useState(false);

    return (
        <div>Hello</div>
    );
