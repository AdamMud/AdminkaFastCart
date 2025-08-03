


import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import {
  useUpdateProductMutation,
  useGetBrandsQuery,
  useGetColorQuery,
  useGetSubQuery,
  useGetProductByIdQuery
} from "../server/userApi";

export default function EditProduct() {
   const { id } = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading } = useGetProductByIdQuery(id);
  const { data: dataBrands } = useGetBrandsQuery();
  const { data: dataColor } = useGetColorQuery();
  const { data: dataSub } = useGetSubQuery();

  const [updateProduct] = useUpdateProductMutation();

  const [productName, setProductName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(false);
  const [count, setCount] = useState("");
  const [addImg, setAddImg] = useState(null);
  const [color, setColor] = useState("");
  const [hasOptions, setHasOptions] = useState(true);

  // Когда пришли данные — заполняем форму
  useEffect(() => {
    if (productData?.data) {
      const p = productData.data;
      setProductName(p.productName || "");
      setCode(p.code || "");
      setDescription(p.description || "");
      setSubCategory(p.subCategoryId || "");
      setBrand(p.brandId || "");
      setPrice(p.price || "");
      setDiscount(p.hasDiscount || false);
      setCount(p.quantity || "");
      setColor(p.colorId || "");
    }
  }, [productData]);

  async function saveChanges() {
    let formData = new FormData();
    if (addImg) {
      Array.from(addImg).forEach((file) => {
        formData.append("Images", file);
      });
    }
    formData.append("Id", id);
    formData.append("BrandId", brand);
    formData.append("ColorId", color);
    formData.append("ProductName", productName);
    formData.append("Description", description);
    formData.append("Quantity", count);
    formData.append("Code", code);
    formData.append("Price", price);
    formData.append("HasDiscount", discount);
    formData.append("SubCategoryId", subCategory);

    try {
      await updateProduct({ id, formData }).unwrap();

      navigate("/products");
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  }

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="p-6 space-y-6">
     
      <section className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Link to={"/products"}>
            <button className="text-[30px] font-bold">←</button>
          </Link>
          <h1 className="font-bold text-[26px]">Products / Update product</h1>
        </div>

        <div className="flex gap-3">
          <Link to={"/products"}>
            <Button variant="outlined">Cancel</Button>
          </Link>
          <Button variant="contained" onClick={saveChanges}>Save</Button>
        </div>
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-6">
        
        <aside className="rounded-lg p-5 space-y-5 shadow-2xl shadow-[gray]">
          <h2 className="font-bold text-lg">Information</h2>

          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <TextField label="Product name" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)} />
            <TextField label="Code" fullWidth value={code} onChange={(e) => setCode(e.target.value)} />
          </div>

          <TextField label="Description" multiline rows={5} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
              <option value="">Select subcategory</option>
              {dataSub?.data?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.subCategoryName}
                </option>
              ))}
            </select>

            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Select brand</option>
              {dataBrands?.data?.map((e) => (
                <option key={e.id} value={e.id}>

                  {e.brandName}
                </option>
              ))}
            </select>
          </div>

          <h2 className="font-bold text-lg">Price</h2>
          <div className="grid grid-cols-3 gap-4">
            <TextField value={price} onChange={(e) => setPrice(e.target.value)} label="Product price" type="number" />
            <TextField value={discount ? 1 : 0} onChange={() => setDiscount(!discount)} label="Discount" type="number" />
            <TextField value={count} onChange={(e) => setCount(e.target.value)} label="Count" type="number" />
          </div>

          <div className="flex items-center gap-2">
            <Switch />
            <span>Add tax for this product</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Different Options</span>
            <Switch checked={hasOptions} onChange={(e) => setHasOptions(e.target.checked)} />
          </div>

          {hasOptions && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Size" />
                <TextField label="Value" placeholder="S, M, L..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Weight" />
                <TextField label="Value" placeholder="10, 20, 30..." />
              </div>
            </div>
          )}
        </aside>

        <div className="space-y-6">
        
          <div className="p-5 rounded-lg shadow-2xl shadow-[gray]">
            <h3 className="font-bold mb-3">Colour:</h3>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              {dataColor?.data?.map((e) => (
                <option key={e.id} value={e.id}>
                    <div>
                        <input type="color" value={e.col} />/
                        <h1>{e.colorName}</h1>
                    </div>
                </option>
              ))}
            </select>
          </div>

          <div className="p-5 rounded-lg shadow-2xl shadow-[gray]">
            <h3 className="font-bold mb-3">Images</h3>
            <div className="border border-dashed border-gray-300 p-5 text-center cursor-pointer">
              <input type="file" onChange={(e) => setAddImg(e.target.files)} multiple />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
