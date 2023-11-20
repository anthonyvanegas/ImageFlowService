## Overview
ImageFlowService is a microservice designed for image uploads and conversions to jpg images. This microservice uses Cloudinary for image storage and manipulation. It is also containerized using Docker.

## Features
* Image Uploading
* Format Conversion
* System Health

## API Endpoints
* UML Sequence Diagram:
  - https://drive.google.com/file/d/1IgFUPhAT4nOfyAL5pl8yyLILsEKaVnmQ/view?usp=sharing
* Upload Image
  - POST /api/images/upload
  - Example Call sending data through body-form-data:
  ```
  { 
    title: "sample",
    description: "A nice sample",
    image: "C:\Images\sample.jpg"
  }
  ```
  - Example Response:
  ```
  {
      "title": "sample",
      "description": "A nice sample",
      "imageId": "aohy0bmiggx65uahe6bw",
      "width": 1920,
      "height": 1080,
      "format": "jpg",
      "url": "http://res.cloudinary.com/dsd8e1jr4/image/upload/v1700497107/aohy0bmiggx65uahe6bw.jpg",
      "created_at": "2023-11-20T16:18:27Z"
  }
  ```
* Get Image in JPG Format
  - GET /api/images/:imageId
  - Using Cloudinary Public ID for imageID
  - Example Call:
  ```
  http://localhost:3000/api/images/dn0iydano3jzotnupmrk
  ```
  - Example Response:
  ```
  {
    "title": "sample",
    "description": "A nice sample",
    "imageId": "dn0iydano3jzotnupmrk",
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "url": "<img src='http://res.cloudinary.com/dsd8e1jr4/image/upload/v1700443004/dn0iydano3jzotnupmrk.jpg' />",
    "created_at": "2023-11-20T01:16:44Z"
  }
  ```
* General System Health Check
  - GET /api/system/health
  - Make sure there is an image with a public ID of "sample" inside of Cloudinary.
  - Example Call:
  ```
  http://localhost:3000/api/system/health
  ```
  - Example Response
  ```
  {
    "status": "Ok",
    "statusCode": 200,
    "message": "ImageFlowService is up and running",
    "timestamp": "2023-11-20T16:26:54.971Z"
  }
  ```

## Deployment
Deploy using Docker, Dockerfile included in repo.
* Run the following inside the working directory:
```
docker build -t imageflowservice .
docker run -p 3000:3000 imageflowservice 
```
