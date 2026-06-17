# Campaign Manager

Recruitment task for a Junior Frontend Developer position at Futurum Technology.

## Live Demo

https://sebastiankostrz.github.io/campaign-crud-app/

## Description

Campaign Manager is a React application for managing advertising campaigns through a full CRUD workflow.

Users can create, view, edit and delete campaigns. The application also supports keyword suggestions, town selection, campaign status management and Emerald balance tracking.

## Features

* Create new campaigns
* View campaign list
* Edit existing campaigns
* Delete campaigns with confirmation modal
* Search campaigns by name
* Manage campaign status
* Select keywords from predefined suggestions
* Select town from predefined list
* Track Emerald account balance
* Persist campaign and balance data in localStorage
* Responsive layout for desktop, tablet and mobile screens

## Tech Stack

* React
* Vite
* CSS
* localStorage
* Mocked JSON data

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

Backend functionality is mocked. Initial campaign, keyword and town data is loaded from JSON files placed in the `/public/data` directory.

After loading, campaign and balance changes are stored locally in the browser using localStorage.
