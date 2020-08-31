# class User(db.Document):
#     email = db.EmailField(required=True, unique=True)
#     password = db.StringField(required=True, min_length=6)
#     movies = db.ListField(db.ReferenceField('Movie', reverse_delete_rule=db.PULL))
    
# class Movie(db.Document):
#     name = db.StringField(required=True, unique=True)
#     casts = db.ListField(db.StringField(), required=True)
#     genres = db.ListField(db.StringField(),