import React from "react";

import { Paper, Table, TableContainer } from "@material-ui/core";

import {
  BaseApiType,
  BaseViewModel,
  TenantViewModel,
  UserService,
} from "../../types";

import { ChabloomTableBody } from "./Body";
import { ChabloomTableHead } from "./Head";
import { ChabloomTableColumn } from "./Column";
import { ChabloomTablePagination } from "./Pagination";
import { ChabloomTableHeading } from "./Heading";

interface Props {
  userService: UserService;
  tenant: TenantViewModel | undefined;
  api: BaseApiType<BaseViewModel>;
  title: string;
  columns: Array<ChabloomTableColumn>;
  methods: Array<"add" | "edit" | "delete" | "payment" | "paymentSchedule">;
  setAccount: CallableFunction;
}

export const ChabloomTable: React.FC<Props> = (props) => {
  const [data, setData] = React.useState([] as Array<BaseViewModel>);
  const [adding, setAdding] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [editItem, setEditItem] = React.useState<BaseViewModel>(
    {} as BaseViewModel
  );
  const [deleteIndex, setDeleteIndex] = React.useState(-1);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  // Get the table data
  React.useEffect(() => {
    const getTableData = async () => {
      const user = await props.userService.getUser();
      if (user && props.api) {
        setProcessing(true);
        const [items, err] = await props.api.readItems();
        if (items && !err) {
          try {
            const sortedData = items.sort((a, b) =>
              a["name"].localeCompare(b["name"])
            );
            setData([...sortedData]);
            setError("");
          } catch {
            try {
              setData(items);
              setError("");
            } catch {
              setError("item read failed");
            }
          }
        } else {
          setData([] as Array<BaseViewModel>);
          setError(err);
        }
        setProcessing(false);
      }
    };
    getTableData().then();
  }, [props.userService, props.api, props.title]);

  return (
    <TableContainer component={Paper}>
      <ChabloomTableHeading
        {...props}
        data={data}
        setData={setData}
        adding={adding}
        setAdding={setAdding}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        editItem={editItem}
        setEditItem={setEditItem}
        deleteIndex={deleteIndex}
        setDeleteIndex={setDeleteIndex}
        processing={processing}
        setProcessing={setProcessing}
        error={error}
        setError={setError}
      />
      <Table>
        <ChabloomTableHead
          {...props}
          data={data}
          setData={setData}
          adding={adding}
          setAdding={setAdding}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          deleteIndex={deleteIndex}
          setDeleteIndex={setDeleteIndex}
          processing={processing}
          setProcessing={setProcessing}
        />
        <ChabloomTableBody
          {...props}
          data={data}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          editIndex={editIndex}
          editItem={editItem}
          setEditItem={setEditItem}
          deleteIndex={deleteIndex}
          processing={processing}
        />
      </Table>
      <ChabloomTablePagination data={data} />
    </TableContainer>
  );
};
