import { handleError } from '@/pages/api/controllers/errorFactory';

export function catchAsync(fn) {
  return async (req, res, id = undefined) => {
    try {
      if (id) {
        return await fn(req, res, id);
      } else {
        return await fn(req, res);
      }
    } catch (error) {
      handleError(error, res);
    }
  };
}
