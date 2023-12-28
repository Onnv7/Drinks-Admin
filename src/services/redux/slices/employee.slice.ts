import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INotification,
  NotificationConstant,
} from "../../../interfaces/model/notification";
import { IEmployee } from "../../../interfaces/model/employee";
import { axiosPrivate } from "../../api/axios";
import EmployeeApi from "../../api/employee.api";
import { ac } from "../../../hooks/useRefreshToken";
import {
  IChangePasswordReq,
  ICreateEmployeeReq,
  IUpdateEmployeeReq,
} from "../../../interfaces/request/employee.request";

type EmployeePayload = {
  loading: boolean;
  employees: IEmployee[];
  viewEmployee?: IUpdateEmployeeReq;
  succeed?: boolean;
  notification?: INotification;
};

const initialState = {
  loading: false,
  employees: [],
} as EmployeePayload;

export const getAllEmployees = createAsyncThunk(
  "/api/employee/get-all-employee",
  async (_, thunkAPI) => {
    try {
      const response = await EmployeeApi.getAllEmployees();
      const data: IEmployee[] = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Load employee data failed");
    }
  }
);
export const getEmployeeById = createAsyncThunk(
  "/api/employee/get-employee-by-id",
  async (id: string, thunkAPI) => {
    try {
      const response = await EmployeeApi.getEmployeeById(id);
      const data: IUpdateEmployeeReq = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(`Load employee ${id} failed`);
    }
  }
);

export const creteEmployee = createAsyncThunk(
  "/api/employee/create-employee",
  async (employee: ICreateEmployeeReq, thunkAPI) => {
    try {
      const response = await EmployeeApi.createEmployee(employee);
      const data = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Create employee is failed");
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "/api/employee/update-employee",
  async (
    { employee, id }: { employee: IUpdateEmployeeReq; id: string },
    thunkAPI
  ) => {
    try {
      const response = await EmployeeApi.updateEmployee(employee, id);
      const data = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Update employee is failed");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "/api/employee/delete-employee",
  async (id: string, thunkAPI) => {
    try {
      await EmployeeApi.deleteEmployee(id);
      return id;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Update employee is failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  "/api/employee/change-employee-password",
  async ({ id, body }: { id: string; body: IChangePasswordReq }, thunkAPI) => {
    try {
      await EmployeeApi.changePassword(id, body);
      return id;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Update employee is failed");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearStatusEmployee: (state) => {
      state.succeed = undefined;
      state.notification = undefined;
    },
  },
  extraReducers(builder) {
    builder
      // get all employees =================================================================
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllEmployees.fulfilled,
        (state, action: PayloadAction<IEmployee[]>) => {
          state.loading = false;
          state.employees = action.payload;
          state.succeed = undefined;
        }
      )
      .addCase(getAllEmployees.rejected, (state) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Load employee data failed",
        };
      })
      // get employee by id =================================================================
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getEmployeeById.fulfilled,
        (state, action: PayloadAction<IUpdateEmployeeReq>) => {
          state.loading = false;
          state.succeed = undefined;
          state.viewEmployee = action.payload;
        }
      )
      .addCase(getEmployeeById.rejected, (state) => {
        state.loading = false;
      })

      // create employee ============================================================
      .addCase(creteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(creteEmployee.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = true;
        state.notification = {
          type: NotificationConstant.SUCCESS,
          message: "Created employee successfully",
        };
      })
      .addCase(creteEmployee.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Created employee failed",
        };
      })
      // update employee ============================================================
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.succeed = true;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Update employee successfully",
          };
        }
      )
      .addCase(updateEmployee.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Update employee failed",
        };
      })
      // delete employee ============================================================
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.succeed = true;
          state.employees = state.employees.filter(
            (it) => it.id !== action.payload
          );
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Delete employee successfully",
          };
        }
      )
      .addCase(deleteEmployee.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Delete employee failed",
        };
      })
      // change employee's password ============================================================
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.succeed = true;

          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Change employee's password successfully",
          };
        }
      )
      .addCase(changePassword.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Change employee's password failed",
        };
      });
  },
});

export const { clearStatusEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
