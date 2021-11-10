# INTRO

This branch consists all the config from quick-setup branch expect the optimization plugins in webpack

## Setup

### **Install the dependencies by running the command**

```
yarn
```

### **Change the following in webpack.dev.js**

(Copy the tags to search)

1. #PORT and #PORT_1: Set the port on which the app will run. Eg

```
port: 8080
```

2. #MOD_FED_NAME: The module name by which the app will be exposed. Eg:

```
name: myPackage
```

3. #MOD_FED_EXPOSES: The name by which each component will be exposed

Eg: Let say you have following config:

```
name: myPackage,
filename: 'remoteEntry.js',
exposes: {
   './Button': './some/path/to/Button'
}
```

4. #MOUNT_POINT: Rename the mount point for the div

5. #MOD_FED_SHARED (Optional): The dependencies which you want to share with the container.

### **Other configs**

- Add the authTokens in .npmrc file

## FAQs

### What is host/container and remote?

Ans: Remotes: The modules which are exposed for sharing. Eg: Feedback module.
Host/Container: The app which will be consuming the remotes. Eg: Goals module
An app can be both a host and a remote. Eg: The goals app is setup as host and loads the feedback module. At the same time goals also exposes login module which can be utilized by feedback module.

### What is ModuleFederationPlugin

Ans: It is used to expose modules from the app. The configuration for exposing is set by ModuleFederationPlugin.

Configuration object contains following parameters:

- **name(string)**: The name by which the module will be exposed.
  Eg:

```
name: remoteApp
```

- **filename(string)**: The endpoint where the hosts will fetch the module. By convention we use 'remoteEntry.js' as filename
  Eg:

```
filename: remoteEntry.js
```

- **exposes(object)**: Set which modules will be exposed. They key acts as a alias for the location of the module. We can expose the entire app or only particular component or both.
  Eg:

```
exposes: {
   './Home': './some/file/location/of/Home
}
```

- **remotes(object)**: Resolve the exposes modules of a remote in the host. The key acts as an alias for the module name.
  Format:

```
remotes: {
   moduleName: <name>@<domain>/<filename>
}
```

Eg:

```
remotes: {
   'remoteApp': 'remoteApp@https://localhost:8080/remoteEntry.js
}
```

Then Home will be available as `remoteApp/Home` for importing in the container.

**NOTE**: You can set alias for `remoteApp` in the container by while setting up remotes

Let say in the container you have the following config for remotes:

```
remotes: {
   'customPackage': 'remoteApp@https://localhost:8080/remoteEntry.js'
}
```

Then the alias for `remoteApp` is `customPackage` and while importing Button component in the container it will be imported as `customPackage/Home`.

**NOTE**: Assuming that the app was running on https://localhost:8080 in the above example. Please change it based on the port and the endpoint set.

- **shared(list | object)**: Sharing dependencies between the host and the remote. For eg: We can share the react module so that it is not loaded twice.
  Eg:

```
shared: ['react', 'react-router']
```

Can also be further configured, some attributes of shared are:

key: the name of the shared dependency
Eg:

```
shared: {
	react:
}
```

values(object) contain the following attributes

**eager**: Load the dependency synchronously
Eg:

```
shared: {
	react: {
		eager: <false | true>
	}
}
```

**singleton (default false)**: specify that only single copy of the dependency should be available in the dom.
Eg

```
shared: {
	react: {
		singleton: <false | true>
	}
}
```

**requiredVersion**: The specific version that should be loaded. It will throw warning if different version is found

```
shared: {
   react: {
      requiredVersion: 16.13.1
   }
}
```

- You can also share all the dependencies by importing the `package.json` file

```
const deps = require('./package.json').dependencies;

shared: deps
```

### Why bootstrap.js in imported as import('./bootstrap') in index.js?

Ans: So that webpack can asynchronously load packages. Webpack will load all the required packages before the module is rendered.

### Why index.html content of remote is not loaded into the container?

Ans: When the remote is loaded into the container, the index.html of remote is omitted by the container. Only the index.html of the container file will be loaded in the browser. So any configuration inside the index.html file of the remote will not be available in the container.

### What is #MOD_ROOT_PATH?

Ans: To setup the rootPath where the container is loading the remote.
Let say the route path of feedback(remote) are as:

```
/home
/dashboard
```

And the root path is `/`. But goals(container) is loading the feedback at the route path of `/orgId/feedback`. So now the new root path of feedback will be `/orgId/feedback` instead of just `/`. And the route paths will be set as

```
/orgId/feedback/home
/orgId/feedback/dashboard
```

## **Pending improvements**

- **Hot reload**: Hot reload it not working yet. Will be fixed asap.
- **Images**: Images loaded using relative path will fail to load inside the container as the module will try to find images from the containers directory instead of its own directory.
  - Current Solution(Temporary): We are using `CustomImage` component which make the image src as absolute path. It will be removed once a fix is found.
