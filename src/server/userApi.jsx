


let API = "https://store-api.softclub.tj/";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: API,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => "Product/get-products",
            providesTags: ["Products"],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `Product/delete-product?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),



        addProduct: builder.mutation({
            query: (formData) => ({
                url: "Product/add-product",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `Product/update-product?id=${id}`,
                method: "PUT",
                body: formData
            })
        }),

        getProductById: builder.query({
            query: (id) => `Product/get-product-by-id?id=${id}`,
            method: "GET"
        }),


        getColor: builder.query({
            query: () => ({
                url: `Color/get-colors`,
                method: "GET"
            })
        }),

        getSub: builder.query({
            query: () => ({
                url: "https://store-api.softclub.tj/SubCategory/get-sub-category",
                method: "GET"
            })
        }),
        getBrads: builder.query({
            query: () => ({
                url: "https://store-api.softclub.tj/Brand/get-brands",
                method: "GET"
            })
        }),
        getCotegory: builder.query({
            query: () => ({
                url: 'Category/get-categories',
                method: "GET"
            })
        }),
        deleteCotegory: builder.mutation({
            query: (id) => ({
                url: `Category/delete-category?id=${id}`,
                method: "DELETE"
            })
        }),
        addCotegory: builder.mutation({
            query: (formData) => ({
                url: "Category/add-category",
                method: "POST",
                body: formData
            })
        }),
        getBrands: builder.query({
            query: () => ({
                url: `Brand/get-brands`,
                method: "GET"
            })
        }),
        deleteBrands: builder.mutation({
            query: (id) => ({
                url: `Brand/delete-brand?id=${id}`,
                method: "DELETE"
            })
        }),
        addBrands: builder.mutation({
            query: (AddName) => ({
                url: `https://store-api.softclub.tj/Brand/add-brand?BrandName=${AddName}`,
                method: "POST",
                body: AddName
            })
        }),
        getSubCotegory: builder.query({
            query: () => ({
                url: "SubCategory/get-sub-category",
                method: "GET"
            })
        }),
        deleteSubCotegory: builder.mutation({
            query: (id) => ({
                url: `SubCategory/delete-sub-category?id=${id}`,
                method: "DELETE"
            })
        }),
        // addSubCotegory: builder.mutation({
        //     query: (addSub, id) => ({
        //         url: `SubCategory/add-sub-category?CategoryId=${id}&SubCategoryName=${addSub}`,
        //         method: "POST",
        //         body: addSub
        //     })
        // }),
        addSubCotegory: builder.mutation({
            query: ({ name, categoryId }) => ({
                url: `SubCategory/add-sub-category?CategoryId=${categoryId}&SubCategoryName=${name}`,
                method: "POST",
            }),
        }),

        updateCotegory: builder.mutation({
            query: (formData) => ({
                url: `Category/update-category`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["Products"]
        }),
        updateBrands: builder.mutation({
            query: ({ id, brandName }) => ({
                url: `Brand/update-brand?id=${id}&BrandName=${brandName}`,
                method: "PUT",
            }),
        }),
        updateSubCotegory: builder.mutation({
            query: ({ id, subCategoryName, categoryId }) => ({
                url: `SubCategory/update-sub-category?id=${id}&CategoryId=${categoryId}&SubCategoryName=${subCategoryName}`,
                method: "PUT",
            }),
        }),






    }),
});



export const {
    useGetProductQuery,
    useDeleteUserMutation,
    useAddProductMutation,
    useGetColorQuery,
    useGetSubQuery,
    useGetBradsQuery,
    useGetCotegoryQuery,
    useDeleteCotegoryMutation,
    useGetBrandsQuery,
    useDeleteBrandsMutation,
    useAddBrandsMutation,
    useAddCotegoryMutation,
    useGetSubCotegoryQuery,
    useDeleteSubCotegoryMutation,
    useAddSubCotegoryMutation,
    useUpdateCotegoryMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useUpdateBrandsMutation,
    useUpdateSubCotegoryMutation

} = api;
