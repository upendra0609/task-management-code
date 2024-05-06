import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api, BASE_URL, setAuthHeader } from "../api/api";


export const fetchAllTasks = createAsyncThunk("task/fetchAllTasks", async ({ status }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`/api/v1/task/all`, {
      params: { status }
    });
    console.log("Get tasks success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks", async ({ status }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`/api/v1/task/user`, {
      params: { status }
    });
    console.log("Get tasks success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const fetchTasksById = createAsyncThunk("task/fetchTasksById", async ({ taskId }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`/api/v1/task/${taskId}`);
    console.log("Get tasks success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})

export const createTask = createAsyncThunk("task/createTask", async (taskData) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.post(`/api/v1/task/create`, taskData);
    console.log("Create task success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})

export const updateTask = createAsyncThunk("task/updateTask", async ({ taskId, taskData }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.patch(`/api/v1/task/${taskId}`, taskData);
    console.log("Update task success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const assignTaskToUser = createAsyncThunk("task/assignTaskToUser", async ({ taskId, userId }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.post(`/api/v1/task/${taskId}/user/${userId}`);
    console.log("Assign task success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const deleteTask = createAsyncThunk("task/deleteTask", async ({ taskId }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.delete(`/api/v1/task/${taskId}/delete`);
    console.log("Delete task success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})





const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    taskDetails: null,
    usersTask: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchUsersTasks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersTasks.fulfilled, (state, action) => {
        console.log("users task", action.payload);
        state.usersTask = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(fetchTasksById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksById.fulfilled, (state, action) => {
        state.taskDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(createTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(updateTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        })
        state.loading = false;
        state.taskDetails = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(assignTaskToUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignTaskToUser.fulfilled, (state, action) => {
        state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        })
        state.loading = false;
      })
      .addCase(assignTaskToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })



      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


  }
})


export default taskSlice.reducer;