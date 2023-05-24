import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import terrainService from './terrainService'

const initialState = {
  terrains: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
// Create new terrain
export const createTerrain = createAsyncThunk(
  'terrains/create',
  async (terrainData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await terrainService.createTerrain(terrainData, token)

    } catch (error) {
      const message =
        (error.response &&

          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user terrains
export const getTerrains = createAsyncThunk(
  'terrains/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await terrainService.getTerrains(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }

)

// Delete user terrain
export const deleteTerrain = createAsyncThunk(
  'terrains/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await terrainService.deleteTerrain(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const terrainSlice = createSlice({
  name: 'terrain',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTerrain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTerrain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.terrains.push(action.payload)
      })
      .addCase(createTerrain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTerrains.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTerrains.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.terrains = action.payload
      })
      .addCase(getTerrains.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTerrain.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTerrain.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.terrains = state.terrains.filter(
          (terrain) => terrain._id !== action.payload.id
        )
      })
      .addCase(deleteTerrain.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = terrainSlice.actions
export default terrainSlice.reducer