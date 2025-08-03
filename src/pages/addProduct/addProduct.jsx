

import img4 from '../../shared/images/div.MuiBox-root (3).png'
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Switch } from "@mui/material";
import Cart2 from "../../components/component";
import { useAddProductMutation, useGetBrandsQuery, useGetColorQuery, useGetCotegoryQuery, useGetProductQuery, useGetSubCotegoryQuery, useGetSubQuery } from '../../server/userApi';

export default function AddProduct() {
    const [hasOptions, setHasOptions] = useState(true);

    let [productName, setProductName] = useState("")
    let [code, setCode] = useState("")
    let [description, setDescription] = useState("")
    let [subCotegory, setSubCotegory] = useState("")
    let [brand, setBrand] = useState("")
    let [price, setPrice] = useState("")
    let [discount, setDiscount] = useState(false)
    let [count, setCount] = useState("")
    let [addImg, setAddImg] = useState(null)
    let [color, setColor] = useState("")




    let { data } = useGetSubQuery()
    let { data: dataBrands } = useGetBrandsQuery()

    let { data: dataColor } = useGetColorQuery()
    let [addnewUser]=useAddProductMutation()



    async function newProduct() {

        let formData = new FormData()
        if (addImg) {
            Array.from(addImg).forEach((file) => {
                formData.append("Images", file);
            });
        }
        formData.append('BrandId', brand)
        formData.append("ColorId", color)
        formData.append("ProductName", productName)
        formData.append("Description", description)
        formData.append('Quantity', count)
        formData.append("Code", code)
        formData.append("Price", price)
        formData.append("HasDiscount", discount)
        formData.append("SubCategoryId", subCotegory)

        try {
            await addnewUser(formData)
        } catch (error) {
            
        }
    }




    return (
        <div className="p-6 space-y-6">
            {/* Верхняя панель */}
            <section className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                    <Link to={"/products"}>
                        <button className="text-[30px] font-bold">←</button>
                    </Link>
                    <h1 className="font-bold text-[26px]">Products / Add new</h1>
                </div>

                <div className="flex gap-3">
                    <Link to={"/products"}>
                        <Button variant="outlined">Cancel</Button>
                    </Link>
                    <Button variant="contained" onClick={newProduct}>Save</Button>
                </div>
            </section>


            <section className="grid grid-cols-[2fr_1fr] gap-6">
                {/* Левая часть */}
                <aside className=" rounded-lg p-5 space-y-5 shadow-2xl shadow-[gray] ">
                    <h2 className="font-bold text-lg">Information</h2>

                    <div className="grid grid-cols-[2fr_1fr] gap-4">
                        <TextField label="Product name" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)} />
                        <TextField label="Code" fullWidth value={code} onChange={(e) => setCode(e.target.value)} />
                    </div>

                    <TextField label="Description" multiline rows={5} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />

                    <div className="grid grid-cols-2 gap-4">
                      

                        <select value={subCotegory} onChange={(e) => setSubCotegory(e.target.value)}>
                            <option value="">Select subcategory</option>
                            {data?.data?.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.subCategoryName}
                                </option>
                            ))}
                        </select>



                      
                        <select value={brand} onChange={(e) => setBrand(e.target.value)}>

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
                        <TextField value={discount} onChange={(e) => setDiscount(!discount)} label="Discount" type="number" />
                        <TextField value={count} onChange={(e) => setCount(e.target.value)} label="Count" type="number" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Switch />
                        <span>Add tax for this product</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-medium">Different Options</span>
                        <Switch
                            checked={hasOptions}
                            onChange={(e) => setHasOptions(e.target.checked)}
                        />
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
                    {/* Цвет */}
                    <div className="p-5 rounded-lg shadow-2xl shadow-[gray]">
                        <h3 className="font-bold mb-3">Colour:</h3>

                        <select className="flex gap-3" value={color} onChange={(e) => setColor(e.target.value)}>

                            {dataColor?.data.map((e) => {
                                return (
                                    <option key={e.id} value={e.id}>
                                        {e.colorName}
                                    </option>
                                )
                            })}
                        </select>
                    </div>


                    {/* Картинки */}
                    <div className=" p-5 rounded-lg shadow-2xl shadow-[gray]">
                        <h3 className="font-bold mb-3">Images</h3>
                        <div className="border border-dashed border-gray-300 p-5 text-center cursor-pointer">
                            <input type="file" onChange={(e) => setAddImg(e.target.files)} placeholder='Click to upload or drag and drop' />
                        </div>
                        <div className="mt-4 space-y-3">

                            <Cart2 img={img4} name="Healthcare Erbology" />
                            <Cart2 img={img4} name="Healthcare Erbology" />
                            <Cart2 img={img4} name="Healthcare Erbology" />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}



