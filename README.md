# Getting Started with Certificate Designer

This project is a certificate designer application that allows users to create, preview, and download certificates with QR codes. It consists of a client (frontend) and a server (backend) that are both contained within the same repository.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Material UI Setup](#material-ui-setup)
- [Running Client](#running-client)
- [Running Server](#running-server)
- [Additional Commands](#additional-commands)
- [Technologies Used](#technologies-used)


# Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ajayjoji1723/certificate_designer.git
   cd certificate_designer

2.Install dependencies for both the client and server:
    # Install dependencies for the client
        cd client
        npm install
        # or
        yarn install

    # Go back to the root directory
        cd ..

        # Install dependencies for the server
        cd server
        npm install
        # or
        yarn install

3.Material UI Setup
    If you're using Material UI, you may need to install specific dependencies to avoid compatibility issues. Run the following commands to install the necessary packages:

            yarn add @mui/material @mui/icons-material

            # Install legacy-peer-deps to avoid conflicts
            yarn install --legacy-peer-deps

# Running the Application

# Running Client
    1.Navigate to the client directory:
        cd client
    2.Start the development server:
        npm start
        # or
        yarn start

    The client will run on http://localhost:3000.

# Running Server
    1.Navigate to the server directory:
        cd ../server
    2.Start the backend server:
        npm start
        # or
        yarn start

# Technologies Used
# Frontend:

    React.js
    Material UI
    HTML2Canvas
    jsPDF
    Bootstrap

# Backend:

    Node.js
    Express.js
    MongoDB

# Demo Video
    https://www.youtube.com/watch?v=wKVWIIGWZRg
    