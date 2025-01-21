import {Problem} from '../models/problem.model.js';

const searchQuestions = async (call, callback) => {
    const { query, page, limit, type } = call.request;
  
    // Deafult
    const pageNum = page || 1;
    const pageSize = limit || 10;
  
    try {
      const pipeline = [];
  
      const matchStage = { $match: {} };
  
      if (query && query.trim() !== '') {
        matchStage.$match.title = { $regex: query, $options: 'i' }; // Case-insensitive search
      }
  
      // Add type filter
      if (type) {
        matchStage.$match.type = type;
      }
  
      pipeline.push(matchStage);
  
      pipeline.push(
        { $skip: (pageNum - 1) * pageSize },
        { $limit: pageSize }
      );
  
      pipeline.push({
        $project: {
          id: '$_id',
          title: 1,
          type: 1,
        },
      });
  
      const countPipeline = [...pipeline.slice(0, 1), { $count: 'total' }];
      const totalDocs = await Problem.aggregate(countPipeline);
      const total = totalDocs.length > 0 ? totalDocs[0].total : 0;
  
      const results = await Problem.aggregate(pipeline);
  
      const response = {
        questions: results.map((q) => ({
          id: q.id.toString(),
          title: q.title,
          type: q.type,
        })),
        total_pages: Math.ceil(total / pageSize),
        current_page: pageNum,
      };
  
      callback(null, response);
    } catch (error) {
      callback(error, null);
    }
  };
  
export{
  searchQuestions,
}