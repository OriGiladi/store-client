import { LoaderFunction } from 'react-router-dom';
import { BASE_URL } from "../utils/constants";

export const  productLoader: LoaderFunction = async ({params}) => {
    const {id} = params
    const res = await fetch(`${BASE_URL}/product/${id}`)
    return res.json()
}