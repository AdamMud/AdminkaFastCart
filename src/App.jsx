import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "/src/pages/Other/other";
import LogIn from "./pages/log/logIn";
import Banner from "./pages/Other/baner/baner";
import Brands from "./pages/Other/brands/brands";
import Cotegory from "./pages/Other/cotegory/cotegory";
import AddProduct from "./pages/addProduct/addProduct";
import EditProduct from "./pages/editProduct";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashbord />,
      children: [
        {
          path:'logIn',
          index:true,
          element:<LogIn/>
        },
        {
          path: "/dashbord",
        
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path:"/banner",
          element:<Banner/>
        },
        {
          path:"/brands",
          element:<Brands/>
        },
        {
          path:"cotegory",
          element:<Cotegory/>
        },
        {
          path:'/addProduct',
          element:<AddProduct/>
        },
        {
          path:"/editProduct/:id",
          element:<EditProduct/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
