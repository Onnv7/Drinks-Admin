import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SidebarPayload = {
  itemName: string;
};
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { itemName: "dashboard" } as SidebarPayload,
  reducers: {
    selectItemBar: (state, action: PayloadAction<string>) => {
      state.itemName = action.payload;
    },
  },
});

export const { selectItemBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
