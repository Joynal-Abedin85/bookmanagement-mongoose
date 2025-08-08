import { Schema, model, Document } from 'mongoose';

export type Genre =
  | 'FICTION'
  | 'NON_FICTION'
  | 'SCIENCE'
  | 'HISTORY'
  | 'BIOGRAPHY'
  | 'FANTASY';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;

  // instance method
  markUnavailable(): Promise<void>;
}

interface BookModel extends ReturnType<typeof model<IBook>> {
  findAvailableByGenre(genre: Genre): Promise<IBook[]>;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    copies: {
      type: Number,
      required: [true, 'Copies count is required'],
      min: [0, 'Copies cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Copies must be an integer'
      }
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

//
//  Static Method
//
bookSchema.statics.findAvailableByGenre = function (genre: Genre) {
  return this.find({ genre, available: true });
};

//
//  Instance Method
//
bookSchema.methods.markUnavailable = async function () {
  this.available = false;
  await this.save();
};

//
//  Post middleware
//
bookSchema.post('save', function (doc) {
  console.log(`✅ New book saved: ${doc.title}`);
});

export const Book = model<IBook, BookModel>('Book', bookSchema);
