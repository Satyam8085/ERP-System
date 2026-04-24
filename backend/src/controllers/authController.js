import { authenticateUser, getUserById } from "../services/erpRepository.js";

export async function loginController(request, response) {
  const { identifier, password, role } = request.body;

  if (!identifier || !password) {
    return response.status(400).json({
      success: false,
      message: "Identifier and password are required.",
    });
  }

  const user = await authenticateUser(identifier, password, role);

  if (!user) {
    return response.status(401).json({
      success: false,
      message: "Invalid role or credentials.",
    });
  }

  return response.json({
    success: true,
    data: user,
  });
}

export async function meController(request, response) {
  const user = await getUserById(request.params.userId);

  if (!user) {
    return response.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  return response.json({
    success: true,
    data: user,
  });
}
