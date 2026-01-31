
import React from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon } from './Icons';

interface ImageCardProps {
  image: GeneratedImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `flipart-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getAspectClass = (ratio: string) => {
    switch (ratio) {
      case '1:1': return 'aspect-square';
      case '3:4': return 'aspect-[3/4]';
      case '4:3': return 'aspect-[4/3]';
      case '9:16': return 'aspect-[9/16]';
      case '16:9': return 'aspect-video';
      default: return 'aspect-square';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl glass-panel hover:ring-2 hover:ring-indigo-500 transition-all duration-300">
      <div className={`${getAspectClass(image.aspectRatio)} overflow-hidden`}>
        <img 
          src={image.url} 
          alt={image.prompt} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <p className="text-sm font-medium text-white line-clamp-2 mb-4">
          {image.prompt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-300">
            {new Date(image.timestamp).toLocaleDateString()}
          </span>
          <button 
            onClick={downloadImage}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-colors"
            title="Download Image"
          >
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
