import {Problem} from '../models/problem.model.js';

const searchQuestions = async (call, callback) => {
  const { query, page, limit, type } = call.request;
  const pageNum = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
  const pageSize = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
  console.log(query, pageNum, pageSize, type);

  try {
    const pipeline = [];
    const matchStage = { $match: {} };

   if (query && query.trim()) {
      matchStage.$match.title = { $regex: query.trim(), $options: 'i' };
    }

    if (type && type.trim()) {
      matchStage.$match.type = type.trim();
    }

    if (Object.keys(matchStage.$match).length > 0) {
      pipeline.push(matchStage);
    }

    pipeline.push(
      { $skip: (pageNum - 1) * pageSize },
      { $limit: pageSize },
      {
        $project: {
          id: '$_id',
          title: 1,
          type: 1,
        },
      }
    );

    const countPipeline = [{ ...matchStage }, { $count: 'total' }];
    const [totalDocs, results] = await Promise.all([
      Problem.aggregate(countPipeline),
      Problem.aggregate(pipeline),
    ]);

    const total = totalDocs.length > 0 ? totalDocs[0].total : 0;
    const total_pages = Math.ceil(total / pageSize);

    const finalPageNum = pageNum > total_pages ? total_pages : pageNum;

    // If no results, return an empty response
    if (total === 0) {
      return callback(null, {
        questions: [],
        total_pages: 0,
        current_page: finalPageNum,
        message: "No Results",
      });
    }

    // Construct response
    const response = {
      questions: results.map((q) => ({
        id: q.id.toString(),
        title: q.title || "",
        type: q.type,
      })),
      total_pages: total_pages,
      current_page: finalPageNum,
    };

    callback(null, response);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};



export{
  searchQuestions,
}