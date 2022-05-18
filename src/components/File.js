import { MdModeEditOutline, MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import { useState } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '../context/themeContext';
import { getFileIcon } from '../utils';

const File = ({ node, handleEdit, handleDelete, error }) => {
  // When true, the name of the filename will turn into an input where you can edit the name
  const [editMode, setEditMode] = useState(false);
  // Keeps track of the value of the input when editing a file
  const [fileName, setFileName] = useState(node.name);

  const { theme } = useThemeContext();
  const isTopLevel = !node.path.includes('/');

  // Getting the file-ending that Im using to decide which icon should be rendered
  const filetype = node.name.split('.')[1];

  // Extra function just to be able to both call on handleEdit (that I passed as props) and toggle editMode.
  const handleEditTree = () => {
    setEditMode(!editMode);
    handleEdit(fileName);
  };

  /* ---  styles --- */
  const titleClasses = classNames('bg-transparent w-40 sm:w-60 truncate', {
    'border-[1px] ml-8 px-2 py-1 text-sm rounded': editMode,
    'border-red-400': error,
  });

  const containerClasses = classNames('flex h-10 items-center justify-between space-x-10 py-2 border-l-2 border-dotted', {
    'border-l-[1px] border-dashed pl-6': theme === 'HORIZONTAL',
    'sm:pl-0 pl-0 border-none': theme === 'HORIZONTAL' && isTopLevel,
    'sm:pl-8 sm:pt-0 pl-4': theme === 'VERTICAL',
  });

  const titleContainerClasses = classNames('flex mt-2 items-center space-x-2 mb-2 sm:mb-0', {
    'before:border-b-[1px] before:border-dashed before:content-[""] before:absolute before:w-4 before:-ml-6': theme === 'HORIZONTAL' && !isTopLevel,
  });
  /* --- end styles --- */

  return (
    <div className={containerClasses}>
      <div className='flex items-center justify-between w-full'>
        <div className={titleContainerClasses}>
          <span>{getFileIcon(filetype)}</span>
          {!editMode ? (
            <p>{node.name}</p>
          ) : (
            <input className={titleClasses} value={fileName} disabled={!editMode} onChange={(e) => setFileName(e.target.value)} maxLength='30' />
          )}

          {editMode && (
            <button className='rounded text-sm border-[1px] px-2 py-1' onClick={handleEditTree}>
              Edit
            </button>
          )}
        </div>

        {theme === 'VERTICAL' && (
          <div className='space-x-2'>
            <button className='text-xl' onClick={handleDelete}>
              {<MdOutlineDelete />}
            </button>
            <button className='text-xl' onClick={handleEditTree}>
              {editMode ? <MdModeEditOutline /> : <MdOutlineModeEditOutline />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
