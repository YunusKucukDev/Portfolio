import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import request from "../Request/Request";
import { IExperince } from "../Interfaces/IExperience";
import { RootState } from "../Store/store";


interface ExperienceState {
  status: string;
  error: string | null;
}


export const fetchExperinces = createAsyncThunk<IExperince[], void, { rejectValue: string }>(
  "experiences/fetchExperinces",
  async (_, { rejectWithValue }) => {
    try {
      return await request.ExperinceApi.list();
    } catch (error: any) {
      return rejectWithValue(error.data?.message || "Deneyimler yüklenirken bir hata oluştu.");
    }
  }
);

export const fetchExperincesById = createAsyncThunk<IExperince, string, { rejectValue: string }>(
  "experiences/fetchExperincesById",
  async (id, { rejectWithValue }) => {
    try {
      return await request.ExperinceApi.details(id);
    } catch (error: any) {
      return rejectWithValue("Deneyim detayı alınamadı.");
    }
  }
);

export const fetchCreateExperience = createAsyncThunk<IExperince, any, { rejectValue: string }>(
  "experiences/fetchCreateExperience",
  async (formData, { rejectWithValue }) => {
    try {
      return await request.ExperinceApi.createExperince(formData);
    } catch (error: any) {
      return rejectWithValue("Yeni deneyim eklenemedi.");
    }
  }
);

export const fetchUpdateExperience = createAsyncThunk<IExperince, any, { rejectValue: string }>(
  "experiences/fetchUpdateExperience",
  async (formData, { rejectWithValue }) => {
    try {
      return await request.ExperinceApi.updateExperince(formData);
    } catch (error: any) {
      return rejectWithValue("Güncelleme işlemi başarısız.");
    }
  }
);

export const fetchDeleteExperience = createAsyncThunk<string, string, { rejectValue: string }>(
  "experiences/fetchDeleteExperience",
  async (id, { rejectWithValue }) => {
    try {
      await request.ExperinceApi.deleteExperince(id);
      return id;
    } catch (error: any) {
      return rejectWithValue("Silme işlemi başarısız.");
    }
  }
);


const experiencesAdapter = createEntityAdapter<IExperince>();

const initialState = experiencesAdapter.getInitialState<ExperienceState>({
  status: "idle",
  error: null,
});


export const experiencesSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperinces.pending, (state) => {
        state.status = "pendingFetchExperinces";
        state.error = null;
      })
      .addCase(fetchExperinces.fulfilled, (state, action) => {
        experiencesAdapter.setAll(state, action.payload);
        state.status = "idle";
      })


      .addCase(fetchExperincesById.fulfilled, (state, action) => {
        experiencesAdapter.upsertOne(state, action.payload);
        state.status = "idle";
      })


      .addCase(fetchCreateExperience.fulfilled, (state, action) => {
        experiencesAdapter.addOne(state, action.payload);
        state.status = "idle";
      })


      .addCase(fetchUpdateExperience.fulfilled, (state, action) => {
        experiencesAdapter.upsertOne(state, action.payload);
        state.status = "idle";
      })


      .addCase(fetchDeleteExperience.fulfilled, (state, action) => {
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
        (action) => action.type.endsWith("/pending") && !action.type.includes("fetchExperinces"),
        (state) => {
          state.error = null;
        }
      );
  },
});


export const {
  selectAll: selectAllExperiences,
  selectById: selectExperienceById,
} = experiencesAdapter.getSelectors((state: RootState) => state.experiences);

export default experiencesSlice.reducer;