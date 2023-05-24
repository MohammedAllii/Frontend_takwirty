import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = '/terrains/'

// Create new terrain
const createTerrain = async (terrainData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, terrainData, config)
  if(response){
    toast.success("Ajout terrain avec succees")
  }


  return response.data
}

// Get user terrains
const getTerrains = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user terrain
const deleteTerrain = async (terrainId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + terrainId, config)

  return response.data
}


const terrainService = {
  createTerrain,
  getTerrains,
  deleteTerrain,
}

export default terrainService