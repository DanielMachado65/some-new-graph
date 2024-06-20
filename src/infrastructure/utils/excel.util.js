"use strict";

const excelLibrary = require("xlsx");

const generateBufferFromDataJson = (data, name) => {
  const workSheet = excelLibrary.utils.json_to_sheet(data);
  const workBook = excelLibrary.utils.book_new();
  excelLibrary.utils.book_append_sheet(workBook, workSheet, name);
  return excelLibrary.write(workBook, { type: "buffer", sheet: "olhonocarro" });
};

const readExcelFileContent = (path, sheetName) => {
  if (!path || !sheetName)
    throw new Error("path and sheetName are needed fields");
  const workBook = excelLibrary.readFile(path);
  const workSheet = workBook.Sheets[sheetName];
  return excelLibrary.utils.sheet_to_json(workSheet);
};

const writeNewExcelFromJson = (data, name) => {
  if (!data || !name) throw new Error("data and name are needed fields");
  const workSheet = excelLibrary.utils.json_to_sheet(data);
  const workBook = excelLibrary.utils.book_new();
  excelLibrary.utils.book_append_sheet(workBook, workSheet, name);
  return excelLibrary.writeFile(workBook, `${name}.xlsx`);
};

const convertJsonToXLSX = (data, name = "Lote") => {
  const ws = excelLibrary.utils.json_to_sheet(data, { cellStyles: true });
  const wb = excelLibrary.utils.book_new();
  excelLibrary.utils.book_append_sheet(wb, ws, name);
  return excelLibrary.write(wb, { bookType: "xlsx", type: "buffer" });
};

module.exports = {
  generateBufferFromDataJson,
  readExcelFileContent,
  writeNewExcelFromJson,
  convertJsonToXLSX,
};
