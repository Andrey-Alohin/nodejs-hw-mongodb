import { ContactsColection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactQuery = ContactsColection.find({ userId });

  const { contactType, isFavourite } = filter;

  if (typeof contactType !== 'undefined')
    contactQuery.where('contactType', contactType);
  if (typeof isFavourite !== 'undefined')
    contactQuery.where('isFavourite', isFavourite);

  const totalQuerry = contactQuery.clone();

  const [total, data] = await Promise.all([
    totalQuerry.countDocuments(),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const paginationData = calculatePaginationData(total, page, perPage);
  return {
    data,
    ...paginationData,
  };
};

export const getContactById = ({ _id, userId }) =>
  ContactsColection.findOne({ _id, userId });

export const createContact = (payload) => ContactsColection.create(payload);

export const deleteContact = ({ _id, userId }) =>
  ContactsColection.findOneAndDelete({ _id, userId });

export const updateContact = ({ _id, userId, payload }) =>
  ContactsColection.findOneAndUpdate({ _id, userId }, payload, { new: true });
