// userService.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function updateUser(userId: string, updateData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user');
  }

  return response.json();
}


export async function createUser(userData: FormData) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    body: userData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  return response.json();
}

