import {
  getUserById,
  getModuleById,
  listModules,
  listSections,
} from "../services/erpRepository.js";

export async function bootstrapController(request, response) {
  const userId = request.header("x-erp-user-id");
  const user = await getUserById(userId);

  if (!user) {
    return response.status(401).json({
      success: false,
      message: "Login required.",
    });
  }

  const [sections, modules] = await Promise.all([
    listSections(user.role),
    listModules(request.query.section, user.role),
  ]);

  return response.json({
    success: true,
    data: {
      user,
      sections,
      modules,
    },
  });
}

export async function moduleDetailController(request, response) {
  const userId = request.header("x-erp-user-id");
  const user = await getUserById(userId);

  if (!user) {
    return response.status(401).json({
      success: false,
      message: "Login required.",
    });
  }

  const module = await getModuleById(request.params.moduleId, user.role);

  if (!module) {
    return response.status(404).json({
      success: false,
      message: "Module not found.",
    });
  }

  return response.json({
    success: true,
    data: module,
  });
}
