

import { Link } from "react-router-dom";
import { useState } from "react";
import {
    useAddSubCotegoryMutation,
    useDeleteSubCotegoryMutation,
    useGetCotegoryQuery,
    useGetSubCotegoryQuery,
    useUpdateSubCotegoryMutation
} from "../../../server/userApi";

export default function BannerPage() {
    const { data: subData, refetch } = useGetSubCotegoryQuery();
    const { data: categories } = useGetCotegoryQuery();

    const [deleteSub] = useDeleteSubCotegoryMutation();
    const [addSub] = useAddSubCotegoryMutation();

    const [categoryId, setCategoryId] = useState("");
    const [updateSubCategory] = useUpdateSubCotegoryMutation();



    async function handleDelete(id) {
        await deleteSub(id);
        refetch();
    }

    async function newSub(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.addName.value.trim();

        if (!name || !categoryId) {
            return alert("Выберите категорию и введите имя");
        }

        await addSub({ name, categoryId });
        form.reset();
        setCategoryId("");
        refetch();
    }


    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editCategoryId, setEditCategoryId] = useState("");

    function startEdit(subCat) {
        setEditId(subCat.id);
        setEditName(subCat.subCategoryName);
        setEditCategoryId(subCat.categoryId);
    }

    function cancelEdit() {
        setEditId(null);
        setEditName("");
        setEditCategoryId("");
    }

    async function saveEdit() {
        if (!editName.trim() || !editCategoryId) {
            alert("Заполните все поля для редактирования");
            return;
        }
        await updateSubCategory({
            id: editId,
            subCategoryName: editName.trim(),
            categoryId: editCategoryId,
        });
        setEditId(null);
        setEditName("");
        setEditCategoryId("");
        refetch();
    }



    return (
        <div className="p-6 bg-white min-h-screen">
            <header>
                <div className="flex gap-2">
                    <Link to={"/cotegory"}>
                        <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300"> Cotegory</button>
                    </Link>
                    <Link to={"/brands"}>
                        <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">  Brands</button>
                    </Link>
                    <Link to={"/banner"}>
                        <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">    Banner</button>
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-6 mt-6">
                {/* Левый блок — Main sliders */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold mb-4">Main sliders</h2>

                    <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer mb-4">
                        {/* <Upload className="w-6 h-6 text-gray-400" /> */}
                        <span className="text-blue-600 underline text-sm">Click to upload</span>
                        <span className="text-gray-400 text-xs">SVG, PNG, JPG or GIF (max. 900×400px)</span>
                        <input type="file" className="hidden" />
                    </label>

                    <div className="space-y-2 mb-4">
                        <div className="flex flex-col gap-4 border border-gray-200 rounded-lg p-2">
                            {subData?.data?.map((e) => (
                                <div key={e.id} className="flex justify-between w-full p-4 border rounded">
                                    <h1>{e.subCategoryName}</h1>
                                    <button onClick={() => handleDelete(e.id)}>🗑️</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={newSub}>
                        <select className="border border-gray-300 rounded-lg w-full p-2 mb-2" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                            <option value="">Выберите категорию</option>
                            {categories?.data?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>

                        <input name="addName" type="text" placeholder="Add Name" className="border border-gray-300 rounded-lg w-full p-2 mb-2" />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg"  >  Save </button>
                    </form>
                </div>

                {/* Правый блок — Banner */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <h2 className="font-semibold mb-4">Banner</h2>

                    <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer mb-4">
                        {/* <Upload className="w-6 h-6 text-gray-400" /> */}
                        <span className="text-blue-600 underline text-sm">Click to upload</span>
                        <span className="text-gray-400 text-xs">
                            SVG, PNG, JPG or GIF (max. 900×400px)
                        </span>
                        <input type="file" className="hidden" />
                    </label>

                    <div className="space-y-2 mb-4">
                        <div className="flex flex-col gap-4 border border-gray-200 rounded-lg p-2">
                            {subData?.data?.map((e) => (
                                <div key={e.id} className="flex justify-between w-full p-4 border rounded items-center">
                                    <h1>{e.subCategoryName}</h1>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEdit(e)} className="text-blue-600 hover:underline">    ✏️</button>
                                        <button onClick={() => handleDelete(e.id)}>🗑️</button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <form onSubmit={newSub}>
                        <select
                            className="border border-gray-300 rounded-lg w-full p-2 mb-2"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Выберите категорию</option>
                            {categories?.data?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>

                        <input name="addName" type="text" placeholder="05d/23h/59m/35s" className="border border-gray-300 rounded-lg w-full p-2 mb-2" />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg" > Save  </button>
                    </form>


                    {editId && (
                        <div className="border border-yellow-400 p-4 rounded-lg mb-4">
                            <h3 className="mb-2 font-semibold">Редактировать подкатегорию</h3>

                            <select className="border border-gray-300 rounded-lg w-full p-2 mb-2" value={editCategoryId} onChange={(e) => setEditCategoryId(e.target.value)}>
                                <option value="">Выберите категорию</option>
                                {categories?.data?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>

                            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Название подкатегории" className="border border-gray-300 rounded-lg w-full p-2 mb-2" />

                            <div className="flex gap-2">
                                <button onClick={saveEdit} className="bg-green-600 text-white px-4 py-2 rounded-lg"> Сохранить  </button>
                                <button onClick={cancelEdit} className="bg-gray-400 text-black px-4 py-2 rounded-lg">    Отмена</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
