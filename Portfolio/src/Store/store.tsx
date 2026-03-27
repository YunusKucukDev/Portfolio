import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// Sliceların Reducerlarını import et (Slice'ın kendisini değil, reducer'ı alıyoruz)
import { authSlice } from "../Slices/AuthSlice";
import { usersSlice } from "../Slices/UserSlice";
import { experiencesSlice } from "../Slices/ExperienceSlice";
import { projectsSlice } from "../Slices/ProjectSlice";

export const store = configureStore({
    reducer: {
        experiences: experiencesSlice.reducer,
        projects: projectsSlice.reducer,
        users: usersSlice.reducer,
        auths: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispacth = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();