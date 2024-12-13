"use client"
import React, { useState } from 'react';

const TextToSpeech = () => {
  const [audioLink, setAudioLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function tts(text) {
    setIsLoading(true);
    setError(null);
    setAudioLink(null); // Clear previous audio
    
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate speech');
      }

      if (!data.audioFile) {
        throw new Error('No audio file received from server');
      }

      // Pre-load the audio to verify it's accessible
      const audio = new Audio(data.audioFile);
      await new Promise((resolve, reject) => {
        audio.onloadeddata = resolve;
        audio.onerror = () => reject(new Error('Failed to load audio file'));
        // Set a timeout in case loading takes too long
        setTimeout(() => reject(new Error('Audio loading timeout')), 10000);
      });

      setAudioLink(data.audioFile);
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message || 'Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={() => tts("Hello, this is a sample text to speech!")}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Generating...' : 'Generate Speech'}
      </button>

      {error && (
        <div className="text-red-500 mt-2">
          {error}
        </div>
      )}

      {audioLink && (
        <div className="mt-4">
          <audio 
            controls 
            className="w-full max-w-md"
            onError={(e) => {
              console.error('Audio playback error:', e);
              setError('Failed to play audio. Please try again.');
              setAudioLink(null);
            }}
          >
            <source src={audioLink} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;