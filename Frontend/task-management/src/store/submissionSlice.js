import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL, setAuthHeader } from "../api/api";




export const submitTask = createAsyncThunk("submission/submitTask", async ({ taskId, githubUrl }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  console.log("submitTask", taskId, "   ", githubUrl);
  try {
    const { data } = await api.post(`/api/v1/submission?taskId=${taskId}&githubUrl=${githubUrl}`, {});
    console.log("Submit task success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const getSubmissionById = createAsyncThunk("submission/getSubmissionById", async ({ submissionId }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`/api/v1/submission/${submissionId}`);
    console.log("Get submission success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const fetchAllSubmission = createAsyncThunk("submission/fetchAllSubmission", async () => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`/api/v1/submission/all`);
    console.log("Get submission success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})


export const fetchSubmissionByTaskId = createAsyncThunk("submission/fetchSubmissionByTaskId", async ({ taskId }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`/api/v1/submission/task/${taskId}`);
    console.log("Get submission success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})

export const acceptDeclineSubmission = createAsyncThunk("submission/acceptDeclineSubmission", async ({ submissionId, status }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.patch(`/api/v1/submission/${submissionId}?status=${status}`, {});
    console.log("Get submission success", data);
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.error);
  }
})




const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    submission: [],
    isLoading: false,
    error: null,
    status: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submission.push(action.payload);
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })



      .addCase(getSubmissionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmissionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submission = action.payload;
      })
      .addCase(getSubmissionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })



      .addCase(fetchAllSubmission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSubmission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submission = action.payload;
      })
      .addCase(fetchAllSubmission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })



      .addCase(fetchSubmissionByTaskId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubmissionByTaskId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submission = action.payload;
      })
      .addCase(fetchSubmissionByTaskId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(acceptDeclineSubmission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submission = state.submission.map((submission) => {
          if (submission.id === action.payload.id) {
            return action.payload;
          }
          return submission;
        })
      })
      .addCase(acceptDeclineSubmission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })


  }
})

export default submissionSlice.reducer