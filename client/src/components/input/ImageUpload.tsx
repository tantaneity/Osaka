import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { List, ListItem, IconButton, Typography } from '@material-tailwind/react';
import {  TrashIcon, PhotoIcon } from '@heroicons/react/24/solid';

interface ImageUploadFieldProps {
  onImagesUpload: (files: File[]) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ onImagesUpload }) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = [...uploadedImages, ...acceptedFiles.slice(0, 5 - uploadedImages.length)];
    setUploadedImages(newImages);
    onImagesUpload(newImages);
  }, [uploadedImages, onImagesUpload]);

  const handleRemoveImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    onImagesUpload(updatedImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'image/png': [], 'image/jpeg': []},
  });

  return (
    <div className="mt-4 mb-6">
      <div {...getRootProps()} className="border-2 border-dashed border-blue-gray-300 rounded-lg p-4 text-center cursor-pointer bg-blue-gray-50 h-72 flex justify-center items-center">
        <input {...getInputProps()} />
        <Typography>Drag 'n' drop up images here, or click to select images</Typography>
      </div>
      <List className="mt-4">
        {uploadedImages.map((file, index) => (
          <ListItem key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhotoIcon className="w-6 h-6 text-gray-500" />
              <span>{file.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <IconButton color="red" size="sm" onClick={() => handleRemoveImage(index)}>
                <TrashIcon className="w-5 h-5" />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ImageUploadField;
