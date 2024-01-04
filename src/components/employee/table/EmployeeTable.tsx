import React, { ReactNode, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./employeetable.scss";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";

import OutLineButton from "../../shared/outlineButton/OutLineButton";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import ModalYesNo from "../../shared/modalYesNo/ModalYesNo";

import { ColorConstants } from "../../../constants/ColorConstant";
import { IEmployee } from "../../../interfaces/model/employee";
import { deleteEmployee } from "../../../services/redux/slices/employee.slice";

type Props = {
  employeeList?: IEmployee[];
};

const EmployeeTable: React.FC<Props> = (props) => {
  const { employeeList = [] } = props;
  const dispatch = useAppDispatch();
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "Username",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "enabled",
      headerName: "Status",
      flex: 1,
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
          <div className="cellEmployeeAction">
            <Link to={`/employee/view/${params.row.id}`}>
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
  const deleteEmployeeSelected = async (id: string | null) => {
    if (id !== null) {
      await dispatch(deleteEmployee(id));
    }
  };

  const handleDeleteButtonClick = (id: string) => {
    setIdSelected(id);
    setOpenDeleteModal(true);
  };
  return (
    <div className="employeeTableContainer">
      {openDeleteModal && (
        <ModalYesNo
          width="500px"
          height="200px"
          title="Notification"
          content="Do you want to delete this employee?"
          onNoClick={() => setOpenDeleteModal(false)}
          onYesClick={() => deleteEmployeeSelected(idSelected)}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
      <DataGrid
        autoHeight
        rowHeight={150}
        rows={employeeList}
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

export default EmployeeTable;
