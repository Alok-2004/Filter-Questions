import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['ANAGRAM', 'MCQ', 'READ_ALONG', 'CONTENT_ONLY', 'CONVERSATION'],
    },
    title: {
      type: String,
      required: true,
    },
    siblingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      default: null,
    },
    details: {
      anagramType: {
        type: String,
        enum: ['WORD', 'SENTENCE'],
      },
      blocks: [
        {
          text: {
            type: String,
            required: true,
          },
          showInOption: {
            type: Boolean,
            default: false,
          },
          isAnswer: {
            type: Boolean,
            default: false,
          },
        },
      ],
      solution: {
        type: String,
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrectAnswer: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const Problem = mongoose.model('Problem', problemSchema);
