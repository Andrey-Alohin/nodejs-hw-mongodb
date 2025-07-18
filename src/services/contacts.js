import { ContactsColection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactQuery = ContactsColection.find();

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

export const getContactById = async (contactId) =>
  ContactsColection.findById(contactId);

export const createContact = (payload) => ContactsColection.create(payload);

export const deleteContact = (contactId) =>
  ContactsColection.findByIdAndDelete(contactId);

export const updateContact = (contactId, payload) =>
  ContactsColection.findByIdAndUpdate(contactId, payload, { new: true });
