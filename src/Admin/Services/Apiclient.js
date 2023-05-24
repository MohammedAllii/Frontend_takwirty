import axios from 'axios';

export async function upgradeUser(c, path) {
  try {
    const response = await axios.put(`http://192.168.1.9:5000/users/${path}/${c}`);
    if (response.status === 200) {
      return 'done';
    } else {
      throw new Error('Failed to upgrade user');
    }
  } catch (error) {
    throw new Error('Failed to upgrade user');
  }
}
export async function upgradeTerrain(c, path) {
  try {
    const response = await axios.put(`http://192.168.1.9:5000/terrains/${path}/${c}`);
    if (response.status === 200) {
      return 'done';
    } else {
      throw new Error('Failed to upgrade terrain');
    }
  } catch (error) {
    throw new Error('Failed to upgrade terrain');
  }
}
