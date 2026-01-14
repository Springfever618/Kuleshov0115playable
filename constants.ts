export interface VideoSource {
  id: string;
  title: string;
  url: string;
  description: string;
}

export const EXPERIMENT_VIDEOS: VideoSource[] = [
  {
    id: 'fear',
    title: 'fear.mp4',
    url: 'fear.mp4',
    description: 'Fear expression video'
  },
  {
    id: 'babycarridge',
    title: 'babycarridge.mp4',
    url: 'babycarridge.mp4',
    description: 'Baby carriage video'
  }
];

// Helper function to get random video
export const getRandomExperimentVideo = (): VideoSource => {
  const randomIndex = Math.floor(Math.random() * EXPERIMENT_VIDEOS.length);
  return EXPERIMENT_VIDEOS[randomIndex];
};