from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect('db.db', check_same_thread=False)
cur = con.cursor()

app = FastAPI()

@app.post('/items')
async def create_item(image: UploadFile,
                title: Annotated[str, Form()], 
                price: Annotated[int, Form()],
                description: Annotated[str, Form()],
                place: Annotated[str, Form()],
                insertAt: Annotated[int, Form()]):
                # 변수의 타입 정해주기
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, place, insertAt)
                VALUES ('{title}','{image_bytes.hex()}',{price},'{description}','{place}',{insertAt})
                """) # items라는 테이블에 괄호 안 변수에 해당하는 데이터를 각각 넣어줌. hex: 16진법으로 변환

    con.commit()
    return '200' # 제대로 들어갔으면 '200' 출력

@app.get('/items')
async def get_items():
    con.row_factory = sqlite3.Row 
    # 컬럼명도 같이 가져옴
    cur = con.cursor()
    rows = cur.execute(f"""
                       SELECT * from items;
                       """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))

@app.get('/images/{item_id}')
async def get_image(item_id):
    cur = con.cursor()
    image_bytes = cur.execute(f"""
                              SELECT image from items WHERE id = {item_id}
                              """).fetchone()[0]
    return Response(content = bytes.fromhex(image_bytes))
    # 16진법을 다시 이미지로 변환
    

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")