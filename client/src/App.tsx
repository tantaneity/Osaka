import { NavBar } from './components/nav/Navigation';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Footer } from './components/footer/Footer';
import HomePage from './pages/HomePage';
import { Suspense, useEffect } from "react"
import useUserStore from './store/UserStore';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/ProductPage';



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

          
      ]
  }])
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <div className="bg-blue-gray-100">
        <NavBar/>
          <RouterProvider router={browserRouter} />
        <Footer/>
      
      </div>
      
      </QueryClientProvider>
    </>
  )
}

export default App
