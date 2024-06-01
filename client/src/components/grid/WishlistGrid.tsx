import { WishlistItem } from "@/types/shop/wish/WishlistItem";
import { WishlistCard } from "../card/WishlistCard";


interface WishlistGridProps {
  items: WishlistItem[];
  onRemove: (productId: string) => void;
}

export const WishlistGrid: React.FC<WishlistGridProps> = ({ items, onRemove }) => {
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
            <WishlistCard key={item.id} item={item} onRemove={onRemove} />
        ))}
        </div>
    );
};
