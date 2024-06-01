import useUserStore from "@/store/UserStore";
import { Spinner, Typography } from "@material-tailwind/react";

const WishlistEmptyLayer: React.FC = () => {
    const {isLoading} = useUserStore()
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen px-8"><Spinner /></div>;
    }
    return (
        <div className="h-screen mx-auto grid text-center px-8">
            <div>
                <img className="w-[200px] h-[200px] mx-auto" src="\src\assets\empty_wishlist_osaka.png" alt="empty-wishlist" />
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="mt-10 !text-3xl !leading-snug md:!text-4xl"
                >
                    Wishlist is empty
                </Typography>
                <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
                    Add some products to your wishlist to keep track of them!
                </Typography>
            </div>
        </div>
    );
};

export default WishlistEmptyLayer;
