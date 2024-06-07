import { useGetAllSells } from "@/hooks/useSells";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Sells } from "@/types/shop/sells/Sells";
import { useGetProducts } from "./useProducts";
import { Product } from "@/types/products/Product";

interface AggregatedData {
  sellsData: { [key: string]: { revenue: number; quantity: number } };
  productsData: { [key: string]: number };
  totalSells: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  isLoading: boolean;
}

export const useAggregatedData = (): AggregatedData => {
  const { data: sellsData, isLoading: isLoadingSells } = useGetAllSells();
  const { data: usersData, isLoading: isLoadingUsers } = useGetUsers();
  const { data: productsData, isLoading: isLoadingProducts } = useGetProducts();

  const isLoading = isLoadingSells || isLoadingUsers || isLoadingProducts;

  if (isLoading) {
    return {
      sellsData: {},
      productsData: {},
      totalSells: 0,
      totalUsers: 0,
      totalProducts: 0,
      totalRevenue: 0,
      isLoading: true,
    };
  }

  const aggregatedSellsData = sellsData?.reduce((acc: { [key: string]: { revenue: number; quantity: number } }, sell: Sells) => {
    const sellDate = new Date(sell.dateSold).toLocaleDateString();
    const sellRevenue = sell.price * sell.quantity;
    acc[sellDate] = {
      revenue: (acc[sellDate]?.revenue || 0) + sellRevenue,
      quantity: (acc[sellDate]?.quantity || 0) + sell.quantity,
    };
    return acc;
  }, {}) || {};

  const aggregatedProductsData = productsData?.reduce((acc: { [key: string]: number }, product: Product) => {
    const productDate = new Date(product.dateAdded).toLocaleDateString();
    acc[productDate] = (acc[productDate] || 0) + 1;
    return acc;
  }, {}) || {};

  const totalSells = Object.values(aggregatedSellsData).reduce((total, sells) => total + sells.quantity, 0);
  const totalRevenue = Object.values(aggregatedSellsData).reduce((total, sells) => total + sells.revenue, 0);
  const totalUsers = usersData ? usersData.length : 0;
  const totalProducts = productsData ? productsData.length : 0;

  return {
    sellsData: aggregatedSellsData,
    productsData: aggregatedProductsData,
    totalSells,
    totalUsers,
    totalProducts,
    totalRevenue,
    isLoading: false,
  };
};
