import { model, Schema } from 'mongoose';

const PhotoSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: false,
      default: null,
    },
  },
  { _id: false },
);

const Contact = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    photo: {
      type: PhotoSchema,
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

Contact.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.photo?.public_id;
  return obj;
};

export const ContactsColection = model('contacts', Contact);
