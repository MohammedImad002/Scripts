const { connectedCollectionData } = require("../constants");

const updateConnectedCollections = async (
  modalName,
  fieldName,
  value,
  filter
) => {
  try {
    const modalData = connectedCollectionData.find(
      (entry) => entry.modalName === modalName
    );
    if (!modalData) {
      throw new Error(
        `Model with name ${modalName} not found in connectedCollectionsData`
      );
    }

    const fieldData = modalData.fieldCollection.find(
      (entry) => entry.field === fieldName
    );
    if (!fieldData) {
      throw new Error(`Field ${fieldName} not found for modal ${modalName}`);
    }

    const collectionsToUpdate = fieldData.connectedCollections;

    const updatePromises = collectionsToUpdate.map(async (collection) => {
      const model = require(`../models/${collection}`);
      const updateQuery = { [fieldData.childField]: value };
      return model.updateMany(filter || {}, {
        $set: updateQuery,
      });
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating connected collections:", error);
    throw error;
  }
};
const updateCollections = async (modalName, fieldValues, id) => {
  for (const fieldName in fieldValues) {
    const value = fieldValues[fieldName];
    try {
      const modalData = connectedCollectionData.find(
        (entry) => entry.modalName === modalName
      );
      if (!modalData) {
        throw new Error(
          `Model with name ${modalName} not found in connectedCollectionsData`
        );
      }

      const fieldData = modalData.fieldCollection.filter(
        (entry) => entry.field === fieldName
      );
      if (!fieldData.length) {
        throw new Error(`Field ${fieldName} not found for modal ${modalName}`);
      }
      for (const singleFieldData of fieldData) {
        const collectionsToUpdate = singleFieldData.connectedCollections;
        const { idField, arrayFilterField } = singleFieldData;
        if (!(idField || arrayFilterField))
          throw `both idField and arrayFilterField doesn't exist
        `;

        const updatePromises = collectionsToUpdate.map(async (collection) => {
          const model = require(`../models/${collection}`);
          const updateQuery = { [singleFieldData.childField]: value };
          const filter = idField ? { [idField]: id } : {};
          const arrayFilter = arrayFilterField
            ? {
                arrayFilters: [
                  {
                    [arrayFilterField]: id,
                  },
                ],
              }
            : {};
          return model.updateMany(
            filter,
            {
              $set: updateQuery,
            },
            arrayFilter
          );
        });

        await Promise.all(updatePromises);
      }
    } catch (error) {
      console.error("Error updating connected collections:", error);
      throw error;
    }
  }
};

const updateParentData = async (modalName, fieldValues, filter) => {
  try {
    const updatePromises = Object.entries(fieldValues).map(
      async ([fieldName, value]) => {
        await updateConnectedCollections(modalName, fieldName, value, filter);
      }
    );
    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating parent data:", error);
    throw error;
  }
};

module.exports = { updateParentData, updateCollections };
