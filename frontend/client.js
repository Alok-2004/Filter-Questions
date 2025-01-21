import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = '../problems.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const questionsProto = grpc.loadPackageDefinition(packageDefinition).questions;

const client = new questionsProto.QuestionService('localhost:9000', grpc.credentials.createInsecure());

const searchQuery = {
  title: '', 
  type: 'Anagram',
  page: 1,
  pageSize: 10,
};

// Send a request to the server
client.SearchQuestions(searchQuery, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Search Results:', response);
  }
});
