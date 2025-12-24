import { type Tool } from '@/types/tool'

export const mediaTools: Tool[] = [
  {
    slug: 'video-audio-converter',
    title: 'Media Converter - Video & Audio Formats',
    category: 'media',
    description: 'Convert between common media formats like MP4, MP3, and GIF with simple quality controls.',
    keywords: [
      'mp4 to mp3',
      'gif to mp4',
      'video converter',
      'audio converter',
      'media converter',
    ],

    component: 'media-converter',
    tags: ['popular', 'file-conversion'],
    inputType: 'media file',
    outputType: 'converted media',

    examples: [
      {
        input: 'video.mp4',
        output: 'audio.mp3',
        description: 'Convert MP4 video to MP3 audio',
      },
      {
        input: 'animation.gif',
        output: 'animation.mp4',
        description: 'Convert GIF to MP4 video',
      },
    ],

    faq: [
      {
        question: 'Which conversions are supported?',
        answer: 'The tool focuses on popular conversions like MP4 to MP3 and GIF to MP4. Support varies by browser capabilities.',
      },
      {
        question: 'Is conversion done locally?',
        answer: 'Yes. Files are processed in your browser for privacy. Large files may take longer to convert.',
      },
      {
        question: 'Can I control quality?',
        answer: 'Basic quality presets are available for video and audio output.',
      },
    ],

    related: ['image-converter'],

    priority: 6,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
]
