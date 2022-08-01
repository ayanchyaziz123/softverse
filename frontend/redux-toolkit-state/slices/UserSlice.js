import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";
import Cookies from 'js-cookie';

const initialState = {
    success: null,
    error: null,
    loading: false,
    users: [],
    userInfo: Cookies.get('userInfo')
        ? JSON.parse(Cookies.get('userInfo'))
        : null,
    status: null,
    updateSuccess: null,
    new_var: 'this is new'
};



export const Register = createAsyncThunk(
    "users/SignUp",
    async (user, { rejectWithValue }) => {
        try {
            const res = await UserService.sign_up(user);
            console.log("res", res.data);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const Signup_verfication = createAsyncThunk(
    "users/SignUp_verification",
    async (data) => {
        const res = await UserService.SignUp_verification(data);
        return res.data;
    }
);

export const SignIn = createAsyncThunk(
    "users/SignIn",
    async (user, { rejectWithValue }) => {
        try {
            const res = await UserService.sign_in(user);
            const tkn = res.data.userInfo;
            Cookies.set('userInfo', JSON.stringify(tkn));
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {

    await UserService.logout();
});








export const retrieveAllUsers = createAsyncThunk(
    "users/getUsers",
    async (user, { rejectWithValue }) => {
        try {
            const res = await UserService.get_users();
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
);




export const findUserById = createAsyncThunk(
    "users/findById",
    async (id) => {
        const res = await UserService.findById(id);
        return res.data;
    }
);

//error here ---->>>>>>>.


export const getUpdateUser = createAsyncThunk(
    "users/getUpdateUser",
    async (user, { rejectWithValue }) => {
        try {
            const res = await UserService.getUpdateUser(user);
            console.log("getuser ", res);
            return res.data;
        } catch (err) {
            console.log("data ", err)
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
);





export const userProfile = createAsyncThunk(
    "blogs/userProfile",
    async (id, { rejectWithValue }) => {
        try {
            const res = await UserService.userProfile(id);
            console.log("res2 -->>>>", res);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
);


const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset() {
          return {
            ...initialState
          }
        }
      },
    reducers: {
        userLogIn : (state, action) =>{
            return "user is here";
        }

    }  
      ,
    extraReducers: {

        [userProfile.pending]: (state, action) => {
            state.loading = true;
            state.message = null;
            state.user = null;
        },

        [userProfile.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.status = "success";
        },
        [userProfile.rejected]: (state, action) => {

            state.status = "failed";
            console.log(action.payload);
            state.message = action.payload;
        },

        ///UPDATE user



        //UPDATE user end

        //update
        [getUpdateUser.pending]: (state, action) => {
            state.status = "loading";
        },

        [getUpdateUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = "success";
        },
        [getUpdateUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = "error happend";
        },

        //end



        [findUserById.pending]: (state, action) => {
            state.status = "loading";
        },

        [findUserById.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.status = "success";
        },
        [findUserById.rejected]: (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        },



        //start to Register user 
        //##########################################################################

        [Register.pending]: (state, action) => {
            state.loading = true;
        },

        [Register.fulfilled]: (state, action) => {
            state.success = action.payload.message;
            state.error = null;
            state.loading = false;
        },
        [Register.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.loading = false;
        },

        //end  to Register user 
        //##########################################################################


        //start to get all USERS 
        //##########################################################################

        [retrieveAllUsers.pending]: (state, action) => {
            state.loading = true;
        },

        [retrieveAllUsers.fulfilled]: (state, action) => {
            state.users = action.payload.users;
            state.success = action.payload.message;
            state.error = null;
            state.loading = false;
        },
        [retrieveAllUsers.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.loading = false;
        },

        //end to get all USERS 
        //##########################################################################





        //start  section for logouting 
        //##########################################################################

        [logout.fulfilled]: (state, action) => {
            state.user_info = null;
        },



        //end  section for logouting 
        //##########################################################################





        //start to signin an USER
        //##########################################################################

        [SignIn.pending]: (state, action) => {
            state.loading = true;
        },
        [SignIn.fulfilled]: (state, action) => {
            state.success = action.payload.message;
            state.userInfo = action.payload.userInfo;
            state.error = null;
            state.loading = false;
        },
        [SignIn.rejected]: (state, action) => {
            state.error = action.payload && action.payload.detail ? action.payload.detail : 'Network Error';
            state.success = null;
            state.loading = false;
        },

        //end to signin an USER
        //##########################################################################

        // user log out

        // [LogOut.pending]: (state, action) => {
        //     state.status = "loading";
        //     state.message = [];
        // },
        // [LogOut.fulfilled]: (state, action) => {
        //     console.log("action1", action.payload.msg);
        //     state.message = action.payload.message;
        //     state.user_info = action.payload.user_info;
        //     state.status = null;
        // },
        // [LogOut.rejected]: (state, action) => {
        //     state.status = "failed";
        //     console.log("action2 ", action.payload.error);
        //     state.message = action.payload.error;
        // },




    },
});

export const {userLogIn} = UserSlice.actions;

const { reducer } = UserSlice;
export default reducer;


