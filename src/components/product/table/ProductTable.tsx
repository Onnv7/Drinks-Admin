import React, { ReactNode, useState, Fragment } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IProduct } from "../../../interfaces/product";
import "./producttable.scss";

type Props = {
  product?: IProduct[];
};

const ProductTable: React.FC<Props> = (props) => {
  const { product = [] } = props;

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
      headerName: "Thumbnail",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellProductAction">
            <div className="viewProductButton">View</div>
            <div className="deleteProductButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div
      className="productTableContainer"
      style={{ height: 400, width: "100%" }}
    >
      <DataGrid
        rows={product}
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

export default ProductTable;
