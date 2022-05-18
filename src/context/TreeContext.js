import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { data } from '../assets/data';
import { createTree } from '../utils';

export const TreeContext = createContext();

// Access to both the value of treePaths and setting treePaths is needed in multiple files troughout the application
// hence I'm using a context to easily access it and avoid prop-drilling.
const TreeProvider = ({ children }) => {
  const [treePaths, setTreePaths] = useState();

  let treeArray = useMemo(() => data.map((path) => path.split('/')).reduce((children, path) => createTree(children, path), []), []);

  // Since treeArray has to be created before I can set is as state, Im using a useEffect that keeps track if it changes.
  useEffect(() => {
    setTreePaths(treeArray);
  }, [treeArray]);

  return <TreeContext.Provider value={{ treePaths, setTreePaths }}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => {
  return useContext(TreeContext);
};

export default TreeProvider;
