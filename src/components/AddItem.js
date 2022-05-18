import classNames from 'classnames';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTreeContext } from '../context/TreeContext';
import { add } from '../utils';

// Since I can both add items at root-level and inside folders, I needed this functionality twice
// Instead of repeting code, Im separating it to own component so I can reuse both style and functionality

const AddItem = ({ isRoot, node }) => {
  const [value, setValue] = useState();
  const [error, setError] = useState();
  const { treePaths, setTreePaths } = useTreeContext();

  const handleAdd = () => {
    setError();

    // Basic error-handling
    if (value.length < 2) return setError('Name must be atleast 2 characters');
    if (value.includes('/')) return setError('Invalid sign');

    // Variable to check if another folder/file on the same level already as the same name
    // Dependent on whether I am using this component from the root or a nested folder, the check is a little bit different.
    let isExistingItem;
    isRoot
      ? (isExistingItem = treePaths.some((child) => child.name === value))
      : (isExistingItem = node.children.some((child) => child.name === value));

    if (isExistingItem) return setError('The folder already contains an item with this name');

    const newItem = {
      name: value,
      path: isRoot ? value : `${node.path}/${value}`,
      id: uuidv4(), // not optimal, but works in this case.
    };

    const isFile = value.includes('.');
    if (!isFile) newItem.children = [];

    if (isRoot) {
      // if we are adding an item to the root, we want to return the state that is currently there and just add the new object to it!
      setTreePaths([...treePaths, newItem]);
    } else {
      // if we are adding an item to a nested folder, we use the recursive add-function found inside utilites and then replace the full state
      const updatedTreePath = add(treePaths, node.id, newItem);
      setTreePaths(updatedTreePath);
    }

    // emptying input
    setValue('');
  };

  /* --- styles --- */
  const inputClasses = classNames(
    'border-[1px] sm:ml-8 px-2 py-1 text-sm text-teal-50 rounded w-60 bg-transparent focus:outline-none placeholder-gray-400 sm:w-60 ',
    {
      'border-red-400': error,
      'w-60': isRoot,
      'w-40': !isRoot,
    }
  );

  const containerClasses = classNames('space-y-1', {
    'sm:border-l-2 border-dotted': !isRoot,
  });
  /* --- end styles --- */

  return (
    <div className={containerClasses}>
      <div className='space-x-1'>
        <input className={inputClasses} placeholder='Type name...' value={value} onChange={(e) => setValue(e.target.value)} maxLength='30' />
        <button className=' rounded px-2 py-1 text-sm border-[1px]' onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className='h-3 text-xs text-red-400'>{error && <p className='ml-10'>{error}</p>}</div>
    </div>
  );
};

export default AddItem;
