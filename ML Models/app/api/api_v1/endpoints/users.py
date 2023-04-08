from fastapi import APIRouter
import os

router = APIRouter()

import pickle
with open(os.path.dirname(__file__) + "/Gas Price Modelmodel.pkl" , 'rb') as f:
    model = pickle.load(f)

@router.get("/")
async def get_users(a:int, b:int):
    return {"message": str(model.predict([[a,b]]))}