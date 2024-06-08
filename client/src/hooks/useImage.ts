import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ImageService from '@/services/ImageService';
import { ImageCreate } from '@/types/products/Image';

export const useGetImages = () => useQuery({
    queryKey: ['images'],
    staleTime: 1000 * 60 * 5,
    queryFn: () => ImageService.getImages(),
});

export const useGetImageById = (imageId: string | undefined | null) => useQuery({
    queryKey: ['image-by-id', imageId],
    queryFn: () => ImageService.getImageById(imageId || ''),
    enabled: !!imageId,
});

export const useCreateImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-image'],
        mutationFn: (inputImage: ImageCreate) => ImageService.createImage(inputImage),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
        },
    });
};
