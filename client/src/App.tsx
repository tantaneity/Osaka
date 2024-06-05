import { NavBar } from './components/nav/Navigation';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Footer } from './components/footer/Footer';
import HomePage from './pages/home/HomePage';
import { Suspense } from "react"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/products/ProductPage';
import AccountPage from './pages/account/AccountPage';
import AuthProvider from './providers/AuthProvider';
import OrderPage from './pages/orders/OrderPage';
import WishlistPage from './pages/products/WishlistPage';
import CategoriesPage from './pages/products/CategoriesPage';
import SearchResults from './pages/products/SearchResults';
import OrderFormPage from './pages/orders/OrderFormPage';



function App() {
  const queryClient = new QueryClient()

    const browserRouter = createBrowserRouter([{
      errorElement: <ErrorPage/>,
      children: [
          {
              path: '/',
              element: <Suspense children={<HomePage />} />,
          },
          {
              path: '/drinks/:productId',
              element: <Suspense children={<ProductPage />} />,
          },
          {
              path: '/user/:navigate',
              element: <Suspense children={<AccountPage />} />,
          },
          {
              path: '/user/order/:orderId',
              element: <Suspense children={<OrderPage />} />,
          },
          {
              path: '/wishlist/',
              element: <Suspense children={<WishlistPage />} />,
          },
          {
              path: '/categories/',
              element: <Suspense children={<CategoriesPage />} />,
          },
          {
              path: '/search',
              element: <Suspense children={<SearchResults />} />,
          },
          {
              path: '/shopping_cart/checkout',
              element: <Suspense children={<OrderFormPage />} />,
          },

          
      ]
  }])
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="bg-blue-gray-100">
          
          <NavBar/>
          <RouterProvider router={browserRouter} />
            
          <Footer/>
        
        </div>
        </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
