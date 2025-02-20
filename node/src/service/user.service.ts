import models from "../models/index";
console.log('models.user',models);
export const getUser = function (params: any, raw = false, role: any = false, exclude: any = false) {
  try {
    if (role)
      role = {  }
    return Promise.resolve(models.user.findAll({
      where: { ...params, ...role },
      raw,
      attributes:{exclude:["createdAt","updatedAt"]}
      // ...(exclude ? { attributes: { exclude } } : {}),
      // order: [['createdAt', 'DESC']]
    }))
  } catch (error) {
    return Promise.reject(error)
  }
}
