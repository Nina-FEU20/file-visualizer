import { v4 as uuidv4 } from 'uuid';
import {
  BsFileEarmarkPdfFill,
  BsFillFileEarmarkPlayFill,
  BsFillFileEarmarkTextFill,
  BsFillFileEarmarkFill,
  BsFileEarmarkImageFill,
} from 'react-icons/bs';

// Following functions add, remove and edit all have the same structure, with adjustments on what is being returned when finding a match
// To be able to loop through the deeply nested array Im using recursion and calling the same function again and again as long as there are children

export const add = (array, id, object) =>
  array.map((item) =>
    item.id === id
      ? { ...item, children: [...item.children, object] }
      : item.children
      ? { ...item, children: add(item.children, id, object) }
      : { ...item }
  );

export const remove = (array, id) =>
  array.filter((item) => item.id !== id).map((item) => (item.children ? { ...item, children: remove(item.children, id) } : { ...item }));

export const edit = (array, id, name) =>
  array.map((item) =>
    item.id === id ? { ...item, name: name } : item.children ? { ...item, children: edit(item.children, id, name) } : { ...item }
  );

export const createTree = (children = [], [firstPath, ...rest], parent = []) => {
  // Creating a variable to keep all items for the path
  const path = [...parent];
  path.push(firstPath);

  // Checking if the current piece of path already exists
  let child = children.find((child) => child.name === firstPath);
  // If it doesnt, push it into the children array
  if (!child) {
    // if the current piece of path includes a dot, it means it is a file and not a folder, then we push in just the name
    if (firstPath.includes('.')) {
      children.push((child = { id: uuidv4(), name: firstPath, path: path.join('/') }));
    } else {
      // And if it doesnt, it means its a folder who should be able to have its own children, therefore we push that aswell.
      children.push((child = { id: uuidv4(), name: firstPath, children: [], path: path.join('/') }));
    }
  }
  // If there are more pieces of the path left, rerun this function with the new values
  if (rest.length > 0) createTree(child.children, rest, path);
  return children;
};

// Simple helper-function to get some variation on file-endings. These are just a few, many more could be added.
export const getFileIcon = (name) => {
  switch (name) {
    case 'png':
      return <BsFileEarmarkImageFill />;
    case 'jpeg':
      return <BsFileEarmarkImageFill />;
    case 'mp4':
      return <BsFillFileEarmarkPlayFill />;
    case 'txt':
      return <BsFillFileEarmarkTextFill />;
    case 'pdf':
      return <BsFileEarmarkPdfFill />;
    default:
      return <BsFillFileEarmarkFill />;
  }
};
