from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Lista przechowująca artykuły (na potrzeby tego przykładu używamy listy, w rzeczywistej aplikacji użylibyśmy bazy danych)
articles = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/articles', methods=['GET', 'POST'])
def api_articles():
    if request.method == 'GET':
        return jsonify({'articles': articles})
    elif request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        new_article = {'title': title, 'content': content}
        articles.append(new_article)
        return jsonify({'message': 'Article added successfully'})


if __name__ == '__main__':
    app.run(debug=True)