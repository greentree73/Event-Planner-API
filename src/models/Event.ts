import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  location?: string;
  category: "Meeting" | "Conference" | "Personal" | "Workshop" | "Other";
  attendees: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return !isNaN(new Date(value).getTime()); // checks if it's a valid date
        },
        message: (props) => `${props.value} is not a valid date!`,
      },
    },

    location: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Meeting", "Conference", "Personal", "Workshop", "Other"],
      default: "Other",
    },

    attendees: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  },
);

//eventSchema.pre("save", function (next) {
//  this.updatedAt = new Date();
//  next();
//});

export const Event = mongoose.model<IEvent>("Event", eventSchema);


