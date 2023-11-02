import { DataGrid, GridColDef } from "@mui/x-data-grid";

import React, { ReactNode, useState } from "react";

import "./categorytable.scss";

import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { deleteCategory } from "../../../services/redux/slices/category.slice";
import ModalYesNo from "../../shared/modalYesNo/ModalYesNo";
import UpdateCategoryModal from "../updateCategoryModal/UpdateCategoryModal";
import { ICategory } from "../../../interfaces/model/category";
import OutLineButton from "../../shared/outlineButton/OutLineButton";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import { ColorConstants } from "../../../constants/ColorConstant";

type Props = {
  categoryList?: ICategory[];
};

const CategoryTable: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { categoryList: category = [] } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [idSelected, setIdSelected] = useState<string | null>(null);

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
      field: "image",
      headerName: "Image",
      width: 130,
      align: "center",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <img className="cellCategoryImage" src={params.value.url} alt="" />
          </>
        );
      },
    },
    {
      field: "enabled",
      headerName: "Status",
      width: 130,
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
      headerAlign: "center",
      flex: 1,

      renderCell: (params): ReactNode => {
        return (
          <>
            <div className="cellCategoryAction">
              <ElevatedButton
                text="View"
                backgroundColor={ColorConstants.brownButton}
                onClick={() => handleViewButtonClick(params.row.id)}
              />
              <ElevatedButton
                text="Delete"
                // color="red"
                backgroundColor={ColorConstants.redNegative}
                onClick={() => handleDeleteButtonClick(params.row.id)}
              />
            </div>
          </>
        );
      },
    },
  ];
  // event handlers =================================================================
  const handleViewButtonClick = (id: string) => {
    setIdSelected(id);
    setOpenViewModal(true);
  };

  const handleDeleteButtonClick = (id: string) => {
    setIdSelected(id);
    setOpenDeleteModal(true);
  };

  const deleteCategorySelected = async (id: string | null) => {
    if (id !== null) {
      await dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="categoryTableContainer">
      {openViewModal && (
        <UpdateCategoryModal
          onClose={() => setOpenViewModal(false)}
          category={category.filter((it) => it.id === idSelected)[0]}
        />
      )}
      {/* {categoryPayload.loading && <Loading />} */}
      {openDeleteModal && (
        <ModalYesNo
          width="500px"
          height="200px"
          title="Notification"
          content="Do you want to delete this category?"
          onNoClick={() => setOpenDeleteModal(false)}
          onYesClick={() => deleteCategorySelected(idSelected)}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
      <DataGrid
        className="categoryGrid"
        autoHeight
        rowHeight={150}
        rows={category}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default CategoryTable;
