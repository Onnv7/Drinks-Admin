import React, { ReactNode, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./producttable.scss";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import { IProduct } from "../../../interfaces/model/product";
import { IGetAllProductsReq } from "../../../interfaces/request/product.request";
import OutLineButton from "../../shared/outlineButton/OutLineButton";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import ModalYesNo from "../../shared/modalYesNo/ModalYesNo";
import { deleteProduct } from "../../../services/redux/slices/product.slice";
import { ColorConstants } from "../../../constants/ColorConstant";

type Props = {
  product?: IGetAllProductsReq[];
};

const ProductTable: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { product = [] } = props;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
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
      field: "price",
      headerName: "Min price",
      type: "number",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 130,
      align: "center",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <img className="cellProductImage" src={params.value} alt="" />
          </>
        );
      },
    },
    {
      field: "enabled",
      headerName: "Status",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params): ReactNode => {
        const enabled = params.row.enabled;

        return (
          <>
            {enabled ? (
              <OutLineButton
                backgroundColor="#17f2172f"
                color="green"
                text="Enabled"
              />
            ) : (
              <OutLineButton
                backgroundColor="#f2412623"
                color="red"
                text="Disabled"
              />
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      align: "center",
      flex: 1,
      headerAlign: "center",
      renderCell: (params): ReactNode => {
        return (
          <div className="cellProductAction">
            <Link to={`/product/view/${params.row.id}`}>
              <ElevatedButton
                text="View"
                backgroundColor={ColorConstants.brownButton}
              />
            </Link>
            <ElevatedButton
              text="Delete"
              backgroundColor={ColorConstants.redNegative}
              onClick={() => handleDeleteButtonClick(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  // event handlers =================================================================
  const deleteProductSelected = async (id: string | null) => {
    if (id !== null) {
      await dispatch(deleteProduct(id));
    }
  };

  const handleDeleteButtonClick = (id: string) => {
    setIdSelected(id);
    setOpenDeleteModal(true);
  };
  return (
    <div className="productTableContainer">
      {openDeleteModal && (
        // eslint-disable-next-line react/jsx-no-undef
        <ModalYesNo
          width="500px"
          height="200px"
          title="Notification"
          content="Do you want to delete this product?"
          onNoClick={() => setOpenDeleteModal(false)}
          onYesClick={() => deleteProductSelected(idSelected)}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
      <DataGrid
        rowHeight={150}
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
