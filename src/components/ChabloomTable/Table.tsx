import * as React from "react";

import { Paper, Table, TableContainer } from "@material-ui/core";

import { BaseApiType, BaseViewModel } from "../../common";

import { ChabloomTableBody } from "./Body";
import { ChabloomTableHead } from "./Head";
import { ChabloomTableColumn } from "./Column";
import { ChabloomTablePagination } from "./Pagination";
import { ChabloomTableHeading } from "./Heading";
import { useAppContext } from "../../AppContext";

interface Props {
  api: BaseApiType<BaseViewModel>;
  title: string;
  columns: Array<ChabloomTableColumn>;
  methods: Array<"add" | "edit" | "delete" | "payment" | "paymentSchedule">;
  allowSetAccount: boolean;
}

export const ChabloomTable: React.FC<Props> = (props) => {
  const [data, setData] = React.useState([] as Array<BaseViewModel>);
  const [adding, setAdding] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [editItem, setEditItem] = React.useState<BaseViewModel>({} as BaseViewModel);
  const [deleteIndex, setDeleteIndex] = React.useState(-1);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  const { userToken } = useAppContext();

  // Get the table data
  React.useEffect(() => {
    if (userToken) {
      setProcessing(true);
      props.api
        .readItems(userToken)
        .then(([ret, err]) => {
          if (ret && !err) {
            try {
              const sortedData = ret.sort((a, b) => (a["name"] as string).localeCompare(b["name"] as string));
              setData([...sortedData]);
              setError("");
            } catch {
              try {
                setData(ret);
                setError("");
              } catch {
                setError("item read failed");
              }
            }
          } else {
            setData([] as Array<BaseViewModel>);
            setError(err);
          }
        })
        .finally(() => setProcessing(false));
    }
  }, [props.api, props.title, userToken]);

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
