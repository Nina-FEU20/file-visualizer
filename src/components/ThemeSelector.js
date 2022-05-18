import classNames from 'classnames';
import React from 'react';
import { BsDiagram3, BsListNested } from 'react-icons/bs';
import { useThemeContext } from '../context/themeContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeContext();

  const classes = classNames('bg-teal-900 dark:bg-teal600 w-6 h-6  rounded-full shadow-md transform duration-300 ease-in-out', {
    'transform translate-x-8': theme === 'HORIZONTAL',
  });

  return (
    <section className='mb-10 flex flex-col items-center space-y-4 text-gray-50'>
      <p className='font-semibold'>Toggle view mode</p>
      <div className='flex space-x-4 items-center '>
        <p className='text-xs'>LIST VIEW (interactive)</p>
        <div
          className='w-16 h-7 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer relative'
          onClick={() => setTheme((prev) => (prev === 'VERTICAL' ? 'HORIZONTAL' : 'VERTICAL'))}
        >
          <BsListNested className='absolute text-teal-900 text-xl left-2 text-yellow ' />
          <BsDiagram3 className='absolute right-2 text-teal-900 text-2xl text-lg' />
          <div className={classes}></div>
        </div>
        <p className='text-xs'>CARDS (non-interactiv)</p>
      </div>
    </section>
  );
};

export default ThemeSelector;
