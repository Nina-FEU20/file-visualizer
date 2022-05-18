import File from './File';
import Folder from './Folder';
import { remove, edit } from '../utils';
import { useState } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '../context/themeContext';
import { useTreeContext } from '../context/TreeContext';

const TreeNode = ({ node }) => {
  // State to set errors for inputfields
  const [error, setError] = useState('');
  // retrieveing the theme state from context
  const { theme } = useThemeContext();
  // retrieving tree state from context
  const { treePaths, setTreePaths } = useTreeContext();
  // help-variable that keeps track if current node has children or not (is a folder or a file!)
  const hasChildren = !!node.children || (node.children && node.children.length > 0);
  // help-variable to check it current node is a top-level node (no parents!)
  const isTopLevel = !node.path.includes('/');

  // Function to delete an item with the help of remove-function inside utilites.
  // Then passing this function as a prop to both file and folder
  const handleDelete = () => {
    const updatedTreePath = remove(treePaths, node.id);
    setTreePaths(updatedTreePath);
  };

  // Function to edit an item with the help of edit-function inside utilites.
  // Then passing this function as a prop to both file and folder
  const handleEdit = (folderName) => {
    setError();

    if (folderName.length < 2) return setError('Name must be atleast 2 characters');
    if (folderName.includes('/')) return setError('Invalid sign');

    if (node.name === folderName) return;

    if (!error) {
      const updatedTreePath = edit(treePaths, node.id, folderName);
      setTreePaths(updatedTreePath);
    }
  };

  /* --- styles --- */
  const containerClasses = classNames({
    'border-2 p-4 rounded-sm min-w-fit relative': isTopLevel && theme === 'HORIZONTAL',
  });
  /* --- end styles --- */

  return (
    <section className={containerClasses}>
      {/* Since view and functionality will differ a bit depending on if the item is a file or a folder, I've seperated them into two different components */}
      {hasChildren ? (
        <Folder node={node} handleDelete={handleDelete} handleEdit={handleEdit} error={error} setError={setError} />
      ) : (
        <File node={node} handleDelete={handleDelete} handleEdit={handleEdit} error={error} />
      )}
      {isTopLevel && theme === 'HORIZONTAL' && <span className='h-4 border-gray-100 border-l-2 border-dashed absolute right-[50%] -bottom-4'></span>}
    </section>
  );
};

export default TreeNode;
