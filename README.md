## Overview
ImageFlowService is a microservice designed for image uploads and conversions to jpg images. This microservice uses Cloudinary for image storage and manipulation. It is also containerized using Docker.

## Features
* Image Uploading
* Format Conversion
* System Health

## API Endpoints
* Upload Image
  - POST /api/images/upload
* Get Image in JPG Format
  - GET /api/images/:imageId
  - Using Cloudinary Public ID for imageID
* General System Health Check
  - GET /api/system/health

## Deployment
Deploy using Docker, Dockerfile included in repo.
