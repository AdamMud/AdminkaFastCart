

import { Link } from "react-router-dom";
import { useDeleteUserMutation, useGetProductQuery } from "../../server/userApi";

import TextField from '@mui/material/TextField';
import { Button } from 'antd';

export default function Products() {
  const { data, isLoading } = useGetProductQuery();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <>

      <section>
        <Link to={'/addProduct'}>
          <Button type="primary" > AddNewUser </Button>
        </Link>

        <div className="flex justify-between">
          <div>
            <TextField id="outlined-basic" label="Search..." variant="outlined" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />


          </div>
          <div className="flex gap-[10px]">

            <button className="w-[40px] h-[40px] rounded-[10px] border border-[gray]">🖊️</button>
            <button className="w-[40px] h-[40px] rounded-[10px] border border-[gray]">🗑️</button>

          </div>
        </div>
      </section>

      {/* <section>
        <table className="border w-[100%]" border={2}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Product</th>
              <th>Inventory</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.products?.map((e) => (
              <tr key={e.id} className="border border-[gray]">
                <td className="p-2"><input type="checkbox" /></td>
                <td className="p-2 flex items-center">
                  <img
                    className="w-[48px] h-[48px]"
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                  />
                  <h1 className="text-[20px] font-semibold ml-2">{e.productName}</h1>
                </td>
                <td className="p-2">{e.quantity} in stock</td>
                <td>{e.categoryName}</td>
                <td>${e.price}</td>
                <td>
                  <Link to={`/editProdudt/:${e.id}`}>
                  <button>🖊️</button>
                  </Link>
                  <button
                    onClick={() =>
                      deleteUser(e.id)
                        .unwrap()
                        .catch((err) => console.error("Ошибка удаления:", err))
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}

      <section className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="p-4 text-left">
          <input type="checkbox" className="w-4 h-4" />
        </th>
        <th className="p-4 text-left text-gray-600 font-medium">Product</th>
        <th className="p-4 text-left text-gray-600 font-medium">Inventory</th>
        <th className="p-4 text-left text-gray-600 font-medium">Category</th>
        <th className="p-4 text-left text-gray-600 font-medium">Price</th>
        <th className="p-4 text-left text-gray-600 font-medium">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {data?.data?.products?.map((e) => (
        <tr
          key={e.id}
          className="hover:bg-gray-50 transition-colors"
        >
          <td className="p-4">
            <input type="checkbox" className="w-4 h-4" />
          </td>
          <td className="p-4 flex items-center">
            <img
              className="w-12 h-12 rounded-md object-cover"
              src={`https://store-api.softclub.tj/images/${e.image}`}
              alt={e.productName}
            />
            <span className="ml-3 font-medium text-gray-800">
              {e.productName}
            </span>
          </td>
          <td className="p-4 text-gray-700">{e.quantity} in stock</td>
          <td className="p-4 text-gray-700">{e.categoryName}</td>
          <td className="p-4 font-medium">${e.price}</td>
          <td className="p-4 flex gap-3">
            <Link to={`/editProduct/${e.id}`}>
              <button className="text-blue-500 hover:text-blue-700">
                🖊️
              </button>
            </Link>
            <button
              onClick={() =>
                deleteUser(e.id)
                  .unwrap()
                  .catch((err) => console.error("Ошибка удаления:", err))
              }
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</section>

    </>

  );
}
