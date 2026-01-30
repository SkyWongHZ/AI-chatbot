#!/bin/bash

# 构建项目

echo "Building AI Chatbot..."

# 构建前端
echo "Building client..."
cd packages/client
npm run build

# 构建后端
echo "Building server..."
cd ../server
npm run build

echo "Build completed!"
