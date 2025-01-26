import * as grpcWeb from 'grpc-web';

import * as problems_pb from './problems_pb'; // proto import: "problems.proto"


export class QuestionServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  searchQuestions(
    request: problems_pb.SearchRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: problems_pb.SearchResponse) => void
  ): grpcWeb.ClientReadableStream<problems_pb.SearchResponse>;

}

export class QuestionServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  searchQuestions(
    request: problems_pb.SearchRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<problems_pb.SearchResponse>;

}

