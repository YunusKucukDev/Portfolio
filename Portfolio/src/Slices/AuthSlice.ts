import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserIdentity } from "../Interfaces/IUserIdentity";
import { FieldValues } from "react-hook-form";
import request from "../Request/Request";

interface AccountState {
    user: UserIdentity | null;
}

// Uygulama başlarken localStorage'dan oku (Döngüye girmeden state set etmenin yolu)
const storedUser = localStorage.getItem("user");
const initialState: AccountState = {
    user: storedUser ? JSON.parse(storedUser) : null
};

// Thunklar slice'dan ÖNCE tanımlanmalı
export const loginUser = createAsyncThunk<UserIdentity, FieldValues>(
    "account/login",
    async (data, { rejectWithValue }) => {
        try {
            const user = await request.AuthApi.login(data);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return rejectWithValue({ error: error.data });
        }
    }
);

export const getUser = createAsyncThunk<UserIdentity>(
    "account/getuser",
    async (_, thunkAPI) => {
        // thunkAPI.dispatch(setUser(...)) SATIRI SİLİNDİ (Hata kaynağı buydu)
        try {
            const user = await request.AuthApi.getUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const authSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            window.location.href = "/"; 
        },
        setUser: (state, action: PayloadAction<UserIdentity | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user");
        });
    }
});

export const { logout, setUser } = authSlice.actions;