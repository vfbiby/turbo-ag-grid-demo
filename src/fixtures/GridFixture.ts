export const gridData: ICar[] = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxster", price: 72000 },
];

export const columnDefsData = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
];

export type ICar = { make: string; model: string; price: number };

export const defaultColDefData = {
  sortable: true,
  filter: true,
};
