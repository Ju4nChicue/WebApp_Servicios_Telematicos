from flask import Flask, render_template
from database import db
from users.controllers.user_controller import user_controller
from products.controllers.product_controller import product_controller

app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)

app.register_blueprint(user_controller)
app.register_blueprint(product_controller)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/edit/<string:id>')
def edit_user(id):
    print("ID recibido", id)
    return render_template('edit.html', id=id)

@app.route('/edit_product/<string:id>')
def edit_product(id):
    print("ID de producto recibido:", id)
    return render_template('edit_product.html', id=id)

if __name__ == '__main__':
    app.run()


