export interface ChabloomTableColumn {
    title: string;
    accessor: string;
    type: "date" | "email" | "number" | "password" | "text";
}
