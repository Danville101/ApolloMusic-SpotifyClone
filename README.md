# Docker Compose Application Setup Guide

## Overview

This guide provides instructions for running our application using dotnet and npm.

### Prerequisites for .NET CLI:

1. **Operating System Compatibility:**
   - .NET CLI is compatible with Windows, macOS, and Linux distributions. Ensure your operating system is supported by .NET Core.

2. **.NET Core SDK:**
   - Install the .NET Core SDK appropriate for your operating system. You can download it from the official .NET website: [Download .NET](https://dotnet.microsoft.com/download).

3. **System Requirements:**
   - Check the system requirements for the .NET Core SDK to ensure your system meets the necessary specifications in terms of processor, memory, and disk space.

4. **.NET CLI Installation:**
   - Once you have downloaded the .NET Core SDK, follow the installation instructions provided for your specific operating system. After installation, verify that the `dotnet` command is available in your terminal or command prompt.

### Prerequisites for npm:

1. **Node.js Installation:**
   - npm (Node Package Manager) comes bundled with Node.js. Therefore, to install npm, you need to install Node.js first.
   - Download and install Node.js from the official Node.js website: [Download Node.js](https://nodejs.org/).

2. **Operating System Compatibility:**
   - Node.js and npm are available for Windows, macOS, and Linux distributions. Ensure your operating system is compatible.

3. **System Requirements:**
   - Check the system requirements for Node.js to ensure your system meets the necessary specifications in terms of processor, memory, and disk space.

4. **npm Verification:**
   - After installing Node.js, verify that npm is installed by opening your terminal or command prompt and running the following command:
     ```bash
     npm --version
     ```
     This command should display the installed version of npm.

Ensure that you have met these prerequisites before attempting to use the .NET CLI or npm for development or deployment purposes. Following these steps will help ensure a smooth setup and usage experience for both tools.


## Getting Started

1.**Clone the Repository:**

```bash
   git clone https://github.com/Danville101/ApolloMusic-SpotifyClone
   cd ApolloMusic-SpotifyClone
```

2.**Start Backend**

```bash
    cd server
    dotnet restore
    dotnet build
    dotnet run
 ```

3.**Start Frontend:**

``` bash
    cd ../client
    npm install
    npm run start

```

4.**Access the Application:**
 
 Open your web browser and navigate to  [http://localhost:3000](http://localhost:3000)

>Thanks for visiting  
