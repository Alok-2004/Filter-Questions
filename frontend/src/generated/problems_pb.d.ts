import * as jspb from 'google-protobuf'



export class SearchRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): SearchRequest;

  getPage(): number;
  setPage(value: number): SearchRequest;

  getLimit(): number;
  setLimit(value: number): SearchRequest;

  getType(): string;
  setType(value: string): SearchRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchRequest): SearchRequest.AsObject;
  static serializeBinaryToWriter(message: SearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchRequest;
  static deserializeBinaryFromReader(message: SearchRequest, reader: jspb.BinaryReader): SearchRequest;
}

export namespace SearchRequest {
  export type AsObject = {
    query: string,
    page: number,
    limit: number,
    type: string,
  }
}

export class Block extends jspb.Message {
  getText(): string;
  setText(value: string): Block;

  getShowInOption(): boolean;
  setShowInOption(value: boolean): Block;

  getIsAnswer(): boolean;
  setIsAnswer(value: boolean): Block;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    text: string,
    showInOption: boolean,
    isAnswer: boolean,
  }
}

export class Option extends jspb.Message {
  getText(): string;
  setText(value: string): Option;

  getIsCorrectAnswer(): boolean;
  setIsCorrectAnswer(value: boolean): Option;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Option.AsObject;
  static toObject(includeInstance: boolean, msg: Option): Option.AsObject;
  static serializeBinaryToWriter(message: Option, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Option;
  static deserializeBinaryFromReader(message: Option, reader: jspb.BinaryReader): Option;
}

export namespace Option {
  export type AsObject = {
    text: string,
    isCorrectAnswer: boolean,
  }
}

export class Details extends jspb.Message {
  getAnagramType(): string;
  setAnagramType(value: string): Details;

  getBlocksList(): Array<Block>;
  setBlocksList(value: Array<Block>): Details;
  clearBlocksList(): Details;
  addBlocks(value?: Block, index?: number): Block;

  getSolution(): string;
  setSolution(value: string): Details;

  getOptionsList(): Array<Option>;
  setOptionsList(value: Array<Option>): Details;
  clearOptionsList(): Details;
  addOptions(value?: Option, index?: number): Option;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Details.AsObject;
  static toObject(includeInstance: boolean, msg: Details): Details.AsObject;
  static serializeBinaryToWriter(message: Details, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Details;
  static deserializeBinaryFromReader(message: Details, reader: jspb.BinaryReader): Details;
}

export namespace Details {
  export type AsObject = {
    anagramType: string,
    blocksList: Array<Block.AsObject>,
    solution: string,
    optionsList: Array<Option.AsObject>,
  }
}

export class Question extends jspb.Message {
  getId(): string;
  setId(value: string): Question;

  getTitle(): string;
  setTitle(value: string): Question;

  getType(): string;
  setType(value: string): Question;

  getSiblingId(): string;
  setSiblingId(value: string): Question;

  getDetails(): Details | undefined;
  setDetails(value?: Details): Question;
  hasDetails(): boolean;
  clearDetails(): Question;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Question.AsObject;
  static toObject(includeInstance: boolean, msg: Question): Question.AsObject;
  static serializeBinaryToWriter(message: Question, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Question;
  static deserializeBinaryFromReader(message: Question, reader: jspb.BinaryReader): Question;
}

export namespace Question {
  export type AsObject = {
    id: string,
    title: string,
    type: string,
    siblingId: string,
    details?: Details.AsObject,
  }
}

export class SearchResponse extends jspb.Message {
  getQuestionsList(): Array<Question>;
  setQuestionsList(value: Array<Question>): SearchResponse;
  clearQuestionsList(): SearchResponse;
  addQuestions(value?: Question, index?: number): Question;

  getTotalPages(): number;
  setTotalPages(value: number): SearchResponse;

  getCurrentPage(): number;
  setCurrentPage(value: number): SearchResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchResponse): SearchResponse.AsObject;
  static serializeBinaryToWriter(message: SearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchResponse;
  static deserializeBinaryFromReader(message: SearchResponse, reader: jspb.BinaryReader): SearchResponse;
}

export namespace SearchResponse {
  export type AsObject = {
    questionsList: Array<Question.AsObject>,
    totalPages: number,
    currentPage: number,
  }
}

