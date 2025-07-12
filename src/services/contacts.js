import { ContactsColection } from '../db/models/contact.js';

export const getAllContacts = async () => ContactsColection.find();

export const getContactById = async (contactId) =>
  ContactsColection.findById(contactId);

export const createContact = (payload) => ContactsColection.create(payload);

export const deleteContact = (contactId) =>
  ContactsColection.findByIdAndDelete(contactId);

export const updateContact = (contactId, payload) =>
  ContactsColection.findByIdAndUpdate(contactId, payload, { new: true });
