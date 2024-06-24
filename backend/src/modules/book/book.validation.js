import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const create = {
  body: joi
    .object()
    .required()
    .keys({
      title: generalFields.name,
      description: generalFields.name,
      author: joi.string().required(),
      price: joi.number().positive().required(),
      stock: joi.number().positive().default(1).required(),
      discount: joi.number().optional().default(0),
      categoryId: generalFields.id.required(),
      publishedDate: joi.date().required(),
      totalPages: joi.number().optional().default(1),
      soldItemsNumber: joi.number().optional().default(0),
    }),
  file: generalFields.file.required().required(),
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};

export const updateProduct = {
  body: joi
    .object()
    .required()
    .keys({
      name: generalFields.name,
      description: generalFields.name.optional(),
      stock: joi.number().positive().required(),
      discount: joi.number().positive().required(),
      colors: joi.custom((value, helper) => {
        if (value) {
          value = JSON.parse(value);
          const arrayValidationSchema = joi.object({
            value: joi.array().items(joi.string().alphanum()),
          });
          const result = arrayValidationSchema.validate(
            { value },
            { abortEarly: false }
          );
          if (result.error) {
            return (helper.message = "Invaild Value Of Colors");
          } else {
            return true;
          }
        }
      }),
      sizes: joi.custom((value, helper) => {
        value = JSON.parse(value);
        if (!Array.isArray(value)) {
          return helper.message({
            custom: "sizes must be an array",
          });
        } else {
          return true;
        }
      }),
      price: joi.number().required(),
      categoryId: generalFields.id,
      subCategoryId: generalFields.id,
      brandId: generalFields.id,
    }),
  files: joi.object().keys({
    image: joi.array().items(generalFields.file).length(1),
    images: joi.array().items(generalFields.file).length(5),
  }),
  params: joi.object().required().keys({
    id: generalFields.id,
  }),
  query: joi.object().required().keys(),
};
export const deleteProduct = {
  body: joi.object().required().keys(),
  file: generalFields.file,
  params: joi.object().required().keys({ id: generalFields.id }),
  query: joi.object().required().keys(),
};
export const getProductById = {
  body: joi.object().required().keys(),
  file: generalFields.file,
  params: joi.object().required().keys({ id: generalFields.id }),
  query: joi.object().required().keys(),
};
