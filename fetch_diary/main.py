import firebase_admin
from firebase_admin import firestore


def main(request):
    if (not len(firebase_admin._apps)):
        firebase_admin.initialize_app()

    request = request.get_json(silent=True)
    date = request['date']

    db = firestore.client()
    users_ref = db.collection(u'diary').document(date)
    # ドキュメントのデータを取得
    doc = users_ref.get()
    print(doc)
    if doc.exists:
        # フィールドの取得
        fields = doc.to_dict()
        return fields['text']
    else:
        return '400'
