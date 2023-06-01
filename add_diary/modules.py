import datetime
import requests
import json
import firebase_admin
from firebase_admin import firestore
from env import line_channel_access_token

def add_diary(text):
    if (not len(firebase_admin._apps)):
        firebase_admin.initialize_app()

    date = datetime.datetime.now().strftime('%Y%m%d')

    db = firestore.client()
    date_ref = db.collection(u'diary').document(date)
    # ドキュメントのデータを取得
    doc = date_ref.get()
    print(doc)
    if doc.exists:
        # フィールドの取得
        fields = doc.to_dict()
        text = fields['text'] + '\n' + text
    date_ref.set({
        'text': text
    })
    return 'successfully added'


def line_api(reply_token):
    api_endpoint = "https://api.line.me/v2/bot/message/reply"

    # LINEチャネルアクセストークン
    channel_access_token = line_channel_access_token
    messages = [
        {
            "type": "text",
            "text": '日記に追加されました。'
        }]
    # LINE Messaging APIに送信するデータの作成
    payload = {
        "replyToken": reply_token,
        "messages": messages
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {channel_access_token}"
    }

    response = requests.post(
        api_endpoint, data=json.dumps(payload), headers=headers)
    print('####', dir(response))

    # LINE Messaging APIへのリクエストの送信
    return response.status_code
