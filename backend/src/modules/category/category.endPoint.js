import { availableRoles } from "../../middleware/auth.js";

export const endpoint = {
  get: [availableRoles.user, availableRoles.admin],
  add: [availableRoles.user, availableRoles.admin],
  update: [availableRoles.admin],
  delete: [availableRoles.admin],
};
