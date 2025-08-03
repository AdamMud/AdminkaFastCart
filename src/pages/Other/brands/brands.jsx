
import { Link } from "react-router-dom";
import {
  useAddBrandsMutation,
  useDeleteBrandsMutation,
  useGetBrandsQuery,
  useUpdateBrandsMutation
} from "../../../server/userApi";
import { useState } from "react";

export default function Brands() {
  const { data, isLoading, error, refetch } = useGetBrandsQuery();
  const [deleteBrands] = useDeleteBrandsMutation();
  const [addBrands] = useAddBrandsMutation();
  const [updateBrands] = useUpdateBrandsMutation();

  const [brandName, setBrandName] = useState("");
  const [editId, setEditId] = useState(null);

  async function handleSubmit() {
    if (!brandName.trim()) return;

    if (editId) {
      await updateBrands({ id: editId, brandName });
      setEditId(null);
    } else {
      await addBrands(brandName);
    }

    setBrandName("");
    refetch();
  }

  async function handleDelete(id) {
    await deleteBrands(id);
    refetch();
  }



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading brands</p>;

  return (
    <>
      <header>
        <div className="flex">
          <Link to={"/cotegory"}>
            <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Cotegory</button>
          </Link>
          <Link to={"/brands"}>
            <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Brands</button>
          </Link>
          <Link to={"/banner"}>
            <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Banner</button>
          </Link>
        </div>
      </header>

      <section className="flex flex-col lg:flex-row justify-between">
        {/* Список брендов */}
        <aside className="lg:w-[410px]">
          <div className="border border-[gray] rounded-[2px] flex justify-between p-[10px]">
            <h1>Brands</h1>
            <h1>Action</h1>
          </div>

          {data?.data?.map((e) => (
            <div key={e.id} className="flex justify-between items-center p-[10px] border-b border-[gray]">
              <h1>{e.brandName}</h1>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => { setEditId(e.id); setBrandName(e.brandName); }}  > ✏️</button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(e.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </aside>

        {/* Один инпут для добавления и редактирования */}
        <div className="border w-[524px] flex flex-col gap-[20px]  h-[228px] rounded-[10px] p-[20px]">
          <h1 className="text-[30px] font-bold ">
            {editId ? "Edit brand" : "Add new brand"}
          </h1>
          <input
            type="text"
            className="border border-[gray] rounded-[5px] w-full h-[50px] p-[10px]"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Brand name"
          />
          <button
            className={`w-[120px] h-[40px] rounded-[6px] ${
              editId ? "bg-green-500" : "bg-[#2563EB]"
            } text-white text-[20px] lg:ml-[362px]`}
            onClick={handleSubmit}
          >
            {editId ? "Update" : "Create"}
          </button>
        </div>
      </section>
    </>
  );
}
