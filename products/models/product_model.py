from database import db

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def __init__(self, name, description, price, available):
        self.name = name
        self.description = description
        self.price = price
        self.available = available
