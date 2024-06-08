import { useGetProductById } from "@/hooks/useProducts";
import { convertToBase64 } from "@/lib/utils";
import { WishlistItem } from "@/types/shop/wish/WishlistItem";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (productId: string) => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ item, onRemove }) => {
    const { data: product } = useGetProductById(item.productId);
    const imageUrl = product?.images[0].data?.data ? convertToBase64(product?.images[0].data.data) : product?.images[0].base64Url && product?.images[0].base64Url ? product?.images[0].base64Url : 'https://i.pinimg.com/736x/8d/62/26/8d6226d7ea86222727a6f09519a0042d.jpg'
    
    
    return (
        <Card className="mt-6 w-full sm:w-96">

        <CardHeader color="blue-gray" className="relative h-56 overflow-hidden">
            <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover object-center"/>
        </CardHeader>
        <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
            {product?.name}
            </Typography>
            <Typography>
            {product?.description}
            </Typography>
        </CardBody>
        <CardFooter className="pt-0">
            <Button variant="outlined" color="red" onClick={() => onRemove(item.productId)}>Remove</Button>
        </CardFooter>
        </Card>
    );
};
