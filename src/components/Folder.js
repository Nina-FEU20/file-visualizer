import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { MdModeEditOutline, MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import TreeNode from './TreeNode.js';
import classNames from 'classnames';
import { useThemeContext } from '../context/themeContext';
import AddItem from './AddItem';

const Folder = ({ node, handleDelete, handleEdit, error }) => {
  const { theme } = useThemeContext();
  // State to keep track if a folder should be open or closed
  const [showChildren, setShowChildren] = useState(false);
  // When true, an input will appear so you can add more folders or files inside current folder.
  const [addMode, setAddMode] = useState(false);
  // When true, the name of the folder will turn into an input where you can edit the name
  const [editMode, setEditMode] = useState(false);
  // Keeps track of the value of the input when editing a folder
  const [folderName, setFolderName] = useState(node.name);
  const isTopLevel = !node.path.includes('/');

  // Extra function just to be able to both call on handleEdit (that I passed as props) and toggle editMode.
  const handleEditTree = () => {
    setEditMode(!editMode);
    handleEdit(folderName);
  };

  // Since theme-2 is non-interactive, im using a useEffect to set the states whenever the theme is changed
  useEffect(() => {
    if (theme === 'HORIZONTAL') {
      setShowChildren(true);
      setEditMode(false);
      setAddMode(false);
    } else {
      setShowChildren(false);
    }
  }, [theme]);

  /* --- styles --- */
  // There is a lot of conditional styles going on, and I think using the classnames-library and seperating it makes it easier to read and understand
  const buttonClasses = classNames('flex space-x-2 items-center py-2', {
    'font-semibold': showChildren,
    'before:border-b-[1px] before:border-dashed before:content-[""] before:absolute before:w-4 before:-ml-6': theme === 'HORIZONTAL' && !isTopLevel,
  });

  const titleClasses = classNames('bg-transparent w-40 sm:w-60 text-ellipsis', {
    'border-[1px] px-2 py-1 text-sm rounded': editMode && theme === 'VERTICAL',
    'font-semibold': showChildren,
    'border-red-500': error,
    'w-30': theme === 'HORIZONTAL',
  });

  const containerClasses = classNames(' border-l-2 border-dotted', {
    'border-l-[1px] border-dashed pl-6': theme === 'HORIZONTAL',
    'sm:pl-0 pl-0 border-none': theme === 'HORIZONTAL' && isTopLevel,
    'sm:pl-8 pl-4': theme === 'VERTICAL',
  });

  /* --- end styles --- */

  return (
    <div className={containerClasses}>
      <div className='flex items-center sm:space-x-10 justify-between h-10 relative'>
        <div className='flex items-center space-x-1'>
          <button className={buttonClasses} onClick={() => setShowChildren(!showChildren)} disabled={editMode || theme === 'HORIZONTAL'}>
            {showChildren ? <FaFolderOpen /> : <FaFolder />}
            {!editMode ? (
              <p>{node.name}</p>
            ) : (
              <input
                className={titleClasses}
                value={folderName}
                disabled={!editMode}
                onChange={(e) => setFolderName(e.target.value)}
                maxLength='30'
              />
            )}
          </button>
          {editMode && (
            <button className='rounded text-sm border-[1px] px-2 py-1' onClick={handleEditTree}>
              Edit
            </button>
          )}
        </div>

        {theme === 'VERTICAL' && (
          <div className='space-x-2'>
            <button className='text-xl' onClick={() => setAddMode(!addMode)}>
              {addMode ? <IoRemoveCircleOutline /> : <IoAddCircleOutline />}
            </button>
            <button className='text-xl' onClick={handleDelete}>
              {<MdOutlineDelete />}
            </button>
            <button className='text-xl' onClick={() => setEditMode(!editMode)}>
              {editMode ? <MdModeEditOutline /> : <MdOutlineModeEditOutline />}
            </button>
          </div>
        )}
      </div>

      {addMode && <AddItem isRoot={false} node={node} />}

      {/* Recursion! Yet again calling on the treeBranch component, and starting the process all over again */}
      {showChildren && node.children.map((child) => <TreeNode node={child} key={child.id} />)}
    </div>
  );
};

export default Folder;
