import classNames from 'classnames';
import TreeNode from './TreeNode.js';
import { useThemeContext } from '../context/themeContext';
import { useTreeContext } from '../context/TreeContext';
import AddItem from './AddItem';

const Tree = () => {
  // retrieveing the theme state from context
  const { theme } = useThemeContext();
  // retrieving treePaths from context
  const { treePaths } = useTreeContext();

  /* --- styles --- */
  // using library classnames to easily set up conditional styles, here, I'm checking the current state of theme
  const classes = classNames('sm:border-2 sm:p-4 sm:px-6 rounded-md border-gray-50 w-full md:w-10/12 2xl:w-8/12 max-w-screen-xl', {
    'p-0 border-none lg:w-full 2xl:w-full justify-center max-w-screen-2xl lg:flex flex-wrap lg:space-x-4 space-y-4 lg:space-y-0':
      theme === 'HORIZONTAL',
  });

  const card = classNames('', {
    'grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:mt-6 pl-0 relative sm:-mt-4': theme === 'HORIZONTAL',
    'sm:pl-4': theme === 'VERTICAL',
  });

  /* --- end styles --- */

  return (
    <>
      {theme === 'HORIZONTAL' && (
        <>
          <div className='border-2 p-4 rounded-sm font-semibold'>Root</div>
          <span className='2xl:h-20 h-10 border-gray-100 border-l-2 border-dashed'></span>
          <span
            className='2xl:w-[46rem] md:w-[25rem] relative border-gray-100 lg:border-t-2 border-dashed 2xl:-mt-10 
        before:content-[""] before:h-10 before:absolute lg:before:border-x-2 before:w-full before:border-dashed'
          ></span>
        </>
      )}

      <div className={classes}>
        {theme === 'VERTICAL' && (
          <div className='sm:flex items-start'>
            <span className='text-base sm:-mr-4'>Add new file or folder:</span>
            <AddItem isRoot={true} node={treePaths} />
          </div>
        )}

        <div className={card}>{treePaths && treePaths.map((node) => <TreeNode node={node} key={node.id} />)}</div>
      </div>
    </>
  );
};

export default Tree;
