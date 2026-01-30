#!/bin/bash

# 一键启动前后端开发服务器

echo "Starting AI Chatbot Development Servers..."

# 启动后端
cd packages/server
npm run dev &
SERVER_PID=$!

# 启动前端
cd ../client
npm run dev &
CLIENT_PID=$!

echo "Server PID: $SERVER_PID"
echo "Client PID: $CLIENT_PID"

# 等待用户中断
wait
