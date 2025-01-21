import * as grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import  connectDB  from './db/index.js';
import { searchQuestions } from './controllers/question.controllers.js';
import dotenv from 'dotenv';
dotenv.config();

const PROTO_PATH = '../problems.proto';
const PORT = process.env.PORT || 50051;

// Load proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const questionsProto = grpc.loadPackageDefinition(packageDefinition).questions;

const server = new grpc.Server();

server.addService(questionsProto.QuestionService.service, {
  "SearchQuestions": searchQuestions,
});

// MongoDB connection and server start
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    server.bindAsync(
      `0.0.0.0:${PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error('Failed to start gRPC server:', err);
          return;
        }
        console.log(`Server running at 0.0.0.0:${port}`);
        server.start();
      }
    );
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
