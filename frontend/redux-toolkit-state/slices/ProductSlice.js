import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../services/ProductService";
import Cookies from 'js-cookie';

const initialState = {
    success: null,
    error: null,
    loading: false,
    products: [],
    product: null,
    updateSuccess: false,
};


export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (product, { rejectWithValue }) => {
        try {
            const res = await ProductService.create_product(product);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

////// proble herere

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data, { rejectWithValue }) => {
        const {pid, formData} = data;
        try {
            const res = await ProductService.update_product(formData, pid);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)


export const retrieveAllProducts = createAsyncThunk(
    "product/getAllProduct",
    async (product, { rejectWithValue }) => {
        try {
            const res = await ProductService.get_products();
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const res = await ProductService.delete_product(id);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const getProductById = createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const res = await ProductService.get_product_by_id(id);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)




const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        clearStatus: (state, action) => {
            state.error = null,
            state.success = null,
            state.loading = null,
            state.updateSuccess = null
        }
    },
    extraReducers: {

     //start Create Product
        //##########################################################################

        [createProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.success = action.payload.message;
            state.products.push(action.payload.product)
            state.error = null;
            state.loading = false;
        },
        [createProduct.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.loading = false;
        },

        //end Create Product
        //##########################################################################
        


          //start fetch Products
        //##########################################################################
        [retrieveAllProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [retrieveAllProducts.fulfilled]: (state, action) => {
            state.success = action.payload.message;
            state.products = action.payload.products;
            state.error = null;
            state.loading = false;
        },
        [retrieveAllProducts.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.loading = false;
        },

        //end fetch Products
        //##########################################################################

          //start delete Product
        //##########################################################################
        [deleteProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.success = action.payload.message;
            state.products = action.payload.products;
            state.error = null;
            state.loading = false;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.loading = false;
        },

        //end delete Product
        //##########################################################################




         //start get Product  by id
        //##########################################################################
        [getProductById.pending]: (state, action) => {
            state.loading = true;
        },
        [getProductById.fulfilled]: (state, action) => {
            state.success = action.payload.message;
            state.product = action.payload.product;
            state.error = null;
            state.loading = false;
        },
        [getProductById.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.loading = false;
        },

        //end get product by id
        //##########################################################################


          //start get Product  by id
        //##########################################################################
        [updateProduct.pending]: (state, action) => {
            state.updateSuccess = false;
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.success = action.payload.message;
            state.product = action.payload.product;
            state.updateSuccess = true;
            state.error = null;
            state.loading = false;
        },
        [updateProduct.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.updateSuccess = false;
            state.loading = false;
        },

        //end get product by id
        //##########################################################################



    },
});


export const {clearStatus} = ProductSlice.actions;

const { reducer } = ProductSlice;
export default reducer;


