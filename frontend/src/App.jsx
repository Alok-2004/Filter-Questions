import { useState, useEffect } from 'react';
import * as grpcWeb from 'grpc-web';

import * as pb from './generated/problems_pb';
console.log('Available exports:', pb);

// import  {QuestionServiceClient}  from './generated/problems_grpc_web_pb';

import * as generatedCode from './generated/problems_grpc_web_pb';
console.log('Generated code exports:', generatedCode);


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('ANAGRAM');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [questions, setQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Create the client using the correct namespace
  const client = new QuestionServiceClient('http://localhost:9000', null, null);

  // Keeping the dummy data for fallback/testing
  const data = [
    { title: 'Find the Anagram', type: 'ANAGRAM' },
    { title: 'Multiple Choice Quiz', type: 'MCQ' },
    { title: 'Read Along Story', type: 'READ_ALONG' },
    { title: 'Content-Only Guide', type: 'CONTENT_ONLY' },
    { title: 'Interactive Conversation', type: 'CONVERSATION' },
    { title: 'Advanced Anagram Puzzle', type: 'ANAGRAM' },
    { title: 'MCQ Test for Beginners', type: 'MCQ' },
    { title: 'Reading Practice', type: 'READ_ALONG' },
    { title: 'Topic Content Overview', type: 'CONTENT_ONLY' },
  ];

  // Filter dummy data (for fallback)
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (searchType === 'ALL' || item.type === searchType)
  );

  const handleSearch = async (event) => {
    event.preventDefault();
    
    try {
      const request = new SearchRequest();
      request.setQuery(searchQuery);
      request.setType(searchType);
      request.setPage(page);
      request.setLimit(pageSize);

      client.searchQuestions(request, {}, (err, response) => {
        if (err) {
          console.error('Error:', err);
          // Fallback to dummy data on error
          setQuestions([]);
          setTotalPages(Math.ceil(filteredData.length / pageSize));
          return;
        }
        
        const fetchedQuestions = response.getQuestionsList();
        setQuestions(fetchedQuestions);
        setTotalPages(response.getTotalPages());
      });
    } catch (error) {
      console.error('Error creating request:', error);
      // Fallback to dummy data on error
      setQuestions([]);
      setTotalPages(Math.ceil(filteredData.length / pageSize));
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <div className="flex justify-center pt-10">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-4xl px-6 py-4 bg-white rounded-full shadow-2xl transform transition-all space-x-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full h-12 py-4 pl-14 pr-6 rounded-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-700 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 3a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 0l7 7"
              />
            </svg>
          </div>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="h-12 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-full text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            <option value="ANAGRAM">ANAGRAM</option>
            <option value="MCQ">MCQ</option>
            <option value="READ_ALONG">READ_ALONG</option>
            <option value="CONTENT_ONLY">CONTENT_ONLY</option>
            <option value="CONVERSATION">CONVERSATION</option>
          </select>
          <button
            type="submit"
            className="h-12 px-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 3a8 8 0 1 1 0 16 8 8 0 0-16zm0 0l7 7"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="mt-12 px-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Search Results (Page {page} of {totalPages}):
          </h2>
          {questions.length > 0 ? (
            // Display gRPC results if available
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {questions.map((question) => (
                <div
                  key={question.getId()}
                  className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-indigo-600">
                    {question.getTitle()}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Type: {question.getType()}
                  </p>
                  {question.hasDetails() && (
                    <div className="mt-2 text-sm text-gray-600">
                      {question.getDetails().getAnagramType() && (
                        <p>Anagram Type: {question.getDetails().getAnagramType()}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Fallback to dummy data when no gRPC results
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-indigo-600">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">Type: {item.type}</p>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;