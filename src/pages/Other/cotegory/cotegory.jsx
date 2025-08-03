

import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';
import { useState } from "react";
import {
    useAddCotegoryMutation,
    useDeleteCotegoryMutation,
    useGetCotegoryQuery,
    useUpdateCotegoryMutation
} from "../../../server/userApi";

export default function Cotegory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [cotegoryName, setCotegoryName] = useState("");
    const [cotegoryImage, setCotegoryImage] = useState(null);
    const [editId, setEditId] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);


    let { data, refetch } = useGetCotegoryQuery();

    let [deleteUser] = useDeleteCotegoryMutation();
    let [AddCategory] = useAddCotegoryMutation();
    let [updateCotegory] = useUpdateCotegoryMutation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        setCotegoryName("");
        setCotegoryImage(null);
        setEditId(null);
    };

    async function handleDelete(id) {
        await deleteUser(id);
        refetch();
    }

    async function newCotegory(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("CategoryImage", cotegoryImage);
        formData.append("CategoryName", cotegoryName);
        await AddCategory(formData);
        refetch();
        handleCancel();
    }

    function openEditModal(user) {
        setIsEdit(true);
        setCotegoryImage(null); 
        setCotegoryName(user.categoryName);
        setEditId(user.id);
        setCurrentImage(user.categoryImage);
        setIsModalOpen(true);
    }

    async function editCotegorySubmit(e) {
        e.preventDefault();
        let target = e.target;

        let formData = new FormData();
        formData.append("categoryName",  target["EditImg"].files[0]);
        formData.append("categoryImage", target["EditName"].value);
        await updateCotegory(formData); 
        refetch();
        handleCancel();
    }




    return (
        <>
            <header className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex">
                    <Link to={'/cotegory'}>
                        <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Cotegory</button>
                    </Link>
                    <Link to={'/brands'}>
                        <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Brands</button>
                    </Link>
                    <Link to={'/banner'}>
                        <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Baneer</button>
                    </Link>
                </div>

                <Button type="primary" onClick={showModal}>Add name</Button>
            </header>

            {/* Модалка для добавления */}
            <Modal
                title="Add Category"
                open={isModalOpen && !isEdit}
                onCancel={handleCancel}
                footer={null}
            >
                <form onSubmit={newCotegory}>
                    <input type="file" name="Addimg" onChange={(e) => setCotegoryImage(e.target.files[0])} />
                    <input type="text" name="Addname" value={cotegoryName} onChange={(e) => setCotegoryName(e.target.value)} />
                    <button type="submit">Add</button>
                </form>
            </Modal>

            {/* Модалка для редактирования */}
            <Modal
                title="Edit Category"
                open={isEdit}
                onCancel={handleCancel}
                footer={null}
            >
                <form onSubmit={editCotegorySubmit}>
                   


                    {currentImage && (
                        <img
                            src={`https://store-api.softclub.tj/images/${currentImage}`}
                            alt={cotegoryName}
                            className="w-[70px] h-[70px] mx-auto mb-2"
                        />
                    )}
                    <input type="file" name="editImg" onChange={(e) => setCotegoryImage(e.target.files[0])} />

                    <input type="text" name="editName" value={cotegoryName} onChange={(e) => setCotegoryName(e.target.value)} />
                    <button type="submit">Save changes</button>

                </form>

            </Modal>

            <section className="w-[90%] m-auto flex flex-wrap gap-[20px]">
                {data?.data?.map((e) => {
                    return (
                        <div key={e.id} className="w-[182px] p-[15px] border h-[144px] rounded-[10px] flex justify-between items-start">
                            <div>
                                <img src={`https://store-api.softclub.tj/images/${e.categoryImage}`} alt={e.categoryName} className='w-[70px] h-[70px] mx-auto' />
                                <h1 className="text-[20px] font-semibold">{e.categoryName}</h1>
                            </div>
                            <div className="flex flex-col justify-between gap-[60px]">
                                <button onClick={() => openEditModal(e)}>🖊️</button>
                                <button onClick={() => handleDelete(e.id)}>🗑️</button>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
