
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import request from "../Request/Request";
import { RootState } from "../Store/store";
import { IProject } from "../Interfaces/IProject";
interface ProjectState {
    status: string;
    error: string | null;
}

export const fetchProjects = createAsyncThunk<IProject[], void, { rejectValue: string }>(
    "projects/fetchProjects",
    async (_, { rejectWithValue }) => {
        try {
            return await request.projectsApi.list();
        } catch (error: any) {
            return rejectWithValue(error.data?.message || "Projeler yüklenirken bir hata oluştu.");
        }
    }
);

export const fetchProjectsById = createAsyncThunk<IProject, string, { rejectValue: string }>(
    "projects/fetchProjectsById",
    async (id, { rejectWithValue }) => {
        try {
            return await request.projectsApi.details(id);
        } catch (error: any) {
            return rejectWithValue("Proje detayı alınamadı.");
        }
    }
);

export const fetchCreateProject = createAsyncThunk<IProject, any, { rejectValue: string }>(
    "projects/fetchCreateProject",
    async (formData, { rejectWithValue }) => {
        try {
            return await request.projectsApi.createProjects(formData);
        } catch (error: any) {
            return rejectWithValue("Yeni proje eklenemedi.");
        }
    }
);

export const fetchUpdateProject = createAsyncThunk<IProject, any, { rejectValue: string }>(
    "projects/fetchUpdateProject",
    async (formData, { rejectWithValue }) => {
        try {
            return await request.projectsApi.updateProjects(formData);
        } catch (error: any) {
            return rejectWithValue("Güncelleme işlemi başarısız.");
        }
    }
);

export const fetchDeleteProject = createAsyncThunk<string, string, { rejectValue: string }>(
    "projects/fetchDeleteProject",
    async (id, { rejectWithValue }) => {
        try {
            await request.projectsApi.deleteProjects(id);
            return id;
        } catch (error: any) {
            return rejectWithValue("Proje silinemedi.");
        }
    }
);

const experiencesAdapter = createEntityAdapter<IProject>();

const initialState = experiencesAdapter.getInitialState<ProjectState>({
    status: "idle",
    error: null,
});

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = "pendingFetchProjects";
                state.error = null;
            }
            )
            .addCase(fetchProjects.fulfilled, (state, action) => {
                experiencesAdapter.setAll(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchProjectsById.fulfilled, (state, action) => {
                experiencesAdapter.upsertOne(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchCreateProject.fulfilled, (state, action) => {
                experiencesAdapter.addOne(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchUpdateProject.fulfilled, (state, action) => {
                experiencesAdapter.upsertOne(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchDeleteProject.fulfilled, (state, action) => {
                experiencesAdapter.removeOne(state, action.payload);
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
                (action) => action.type.endsWith("/pending") && !action.type.includes("fetchProjects"),
                (state) => {
                    state.error = null;
                }
            );
    }
});

export const {
    selectAll: selectAllProjects,
    selectById: selectProjectById,
} = experiencesAdapter.getSelectors<RootState>((state) => state.projects
);