import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { ReactNode } from "react";
import { ICategory } from "../../../interfaces/category";
import "./categorytable.scss";
import OutLineButton from "../../shared/outlineButton/OutLineButton";
import { Button } from "@mui/material";

type Props = {
  category?: ICategory[];
};

const CategoryTable: React.FC<Props> = (props) => {
  const { category = [] } = props;
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "thumbnailUrl",
      headerName: "Image",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            <img src={params.value} />
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      align: "center",
      headerAlign: "center",

      // <div className="cellCategoryAction">
      //   <div className="viewCategoryButton">View</div>
      //   <div className="deleteCategoryButton">Delete</div>
      // </div>
      renderCell: (params): ReactNode => {
        return (
          <>
            <Button variant="outlined" color="secondary">
              View
            </Button>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div
      className="categoryTableContainer"
      style={{ height: 400, width: "100%" }}
    >
      <DataGrid
        rows={category}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default CategoryTable;
