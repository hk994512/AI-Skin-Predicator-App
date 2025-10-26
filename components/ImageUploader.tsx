
import React, { useRef } from 'react';
import { CameraIcon, PhotoIcon } from './Icons';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, selectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center aspect-square">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        capture="environment"
      />
      {selectedImage ? (
        <div className="w-full h-full rounded-md overflow-hidden relative group">
          <img src={selectedImage} alt="Selected skin condition" className="w-full h-full object-cover" />
           <div 
             onClick={triggerFileInput} 
             className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
           >
             <span className="text-white text-lg font-semibold">Change Image</span>
           </div>
        </div>
      ) : (
        <div
          className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300"
          onClick={triggerFileInput}
        >
          <div className="space-y-4">
            <div className="flex justify-center items-center gap-4 text-gray-500 dark:text-gray-400">
                <CameraIcon className="w-12 h-12" />
                <span className="text-2xl font-light">/</span>
                <PhotoIcon className="w-12 h-12" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-primary-500">Tap to upload</span> or use camera
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
