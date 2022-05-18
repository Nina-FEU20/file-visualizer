# File viewer exercise

## To get started
**1. run `npm install`
2. run `npm start`**

### The Task

The mission was to build a UI to visualise a file tree that would work off an array of string paths. 
This application is only frontend and is not connected to any database, therefore the files list is hardcoded. 

The Project is built with React and Tailwind CSS.

### The Functionality

Execpt for viewing the files, you can also:
- Toggle between to different ways of viewing the files
    * To achieve this, simply press the toggle button in the middle of the page
- Open/Close folders
   * To do this, press either the folder icon or just the folder name, and its children will appear! (Only in list-view)
- Add, edit and delete files/folders (in form of text..)
   * This is only possible in the list view. To add folders/files to the root, simply write a name and add it with the input up to the left. This input will always be shown. For edit, add and delete to nested folders/files each item will have tree icons displayed in a row to the right. Hopefully, the icons should be  
self-explanatory as to which one does which. When pressing the add button, an input underneath the folder will appear where you can add a new item. Pressing the delete button will remove the item instantly. If you press the edit button, the folder name will turn into an input as to where you can edit the name of the item.

Since nothing is stored in a database and I decided not to save anything to localStorage or such, a reload of the page will reset the data to its original state.

### The Process

When first reading the instructions of the test, I quickly realised I would need to manipulate the string paths into some kind of array of nested objects. Next step would be to find a way to render all these nested objects without knowing how deep it could be. This is where I came across the concept of recursion, which is a process of calling itself, and saw a learning opportunity. I am not only using this kind of process when rendering data, but also when adding, deleting och editing the data. 

To create a better structure I decided to set up two context. One to toggle the theme, and one for the data. This gives me easy access to the values of the states in every file, without having to prop-drill. 

Since folders and file has a few differences in both apperannce and functionality, I decided to split these two into two seperate components. Two decide if an item is a folder or a file, I am making the assumption that files include a period, and folders do not. 


### The Result
View it live here https://file-visualizer.vercel.app/

### The Undone

What would a first draft be without a few bugs? There is always more to do! A few bugs that I am not yet to attend that I would like to share. 
Error-handling is not fully complete. Mostly when editing files, no check to see if a name on the same level already exists is made. Also, I am not updating the path when I edit. 
I am not checking that endings for files are actually proper file endings. Any name with a period will simply cound as a file anyway. 
The UI is responsively built, but if you create and open to many nested folders it will break.

These are tasks for future self.

 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
