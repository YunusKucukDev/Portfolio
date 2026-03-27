import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import request from "../Request/Request";
import { IUser } from "../Interfaces/IUser";
import { RootState } from "../Store/store";



interface UserState {
    status: string;
    error: string | null;
}


export const fetchUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            return await request.UserApi.list();
        } catch (error: any) {
            return rejectWithValue(error.data?.message || "Kullanıcılar yüklenirken bir hata oluştu.");
        }
    }
);

export const fetchUsersById = createAsyncThunk<IUser, string, { rejectValue: string }>(
    "users/fetchUsersById",
    async (id, { rejectWithValue }) => {
        try {
            return await request.UserApi.details(id);
        } catch (error: any) {
            return rejectWithValue("Kullanıcı detayı alınamadı.");
        }
    }
);



export const fetchUpdateUser = createAsyncThunk<IUser, any, { rejectValue: string }>(
    "users/fetchUpdateUser",
    async (formData, { rejectWithValue }) => {
        try {
            return await request.UserApi.updateuserinformation(formData);
        } catch (error: any) {
            return rejectWithValue("Güncelleme işlemi başarısız.");
        }
    }
);




const usersAdapter = createEntityAdapter<IUser>();

const initialState = usersAdapter.getInitialState<UserState>({
    status: "idle",
    error: null,
});


export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "pendingFetchUsers";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                usersAdapter.setAll(state, action.payload);
                state.status = "idle";
            })


            .addCase(fetchUsersById.fulfilled, (state, action) => {
                usersAdapter.upsertOne(state, action.payload);
                state.status = "idle";
            })

            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                usersAdapter.upsertOne(state, action.payload);
                state.status = "idle";
            })

            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action: PayloadAction<string | undefined>) => {
                    state.status = "idle";
                    state.error = action.payload || "Bir hata oluştu.";
                }
            )

            .addMatcher(
                (action) => action.type.endsWith("/pending") && !action.type.includes("fetchUsers"),
                (state) => {
                    state.error = null;
                }
            );
    },
});


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export default usersSlice.reducer;