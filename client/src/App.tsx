import { NavBar } from './components/nav/Navigation';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Footer } from './components/footer/Footer';
import HomePage from './pages/HomePage';
import { Suspense, useEffect } from "react"
import useUserStore from './store/UserStore';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/ProductPage';
import AccountPage from './pages/AccountPage';
import AuthProvider from './providers/AuthProvider';



function App() {
  const queryClient = new QueryClient()
  const checkAuth = useUserStore(state => state.checkAuth)

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            checkAuth()
        }
    }, [checkAuth])

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

          
      ]
  }])
  return (
    <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="bg-blue-gray-100">
          
          <NavBar/>
            <RouterProvider router={browserRouter} />
          <Footer/>
        
        </div>
        
        </QueryClientProvider>
    </AuthProvider>
     
    </>
  )
}

export default App
