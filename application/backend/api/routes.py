from api.covid.resource import Covid
from api.fire.resource import Fire

def initialize_routes(api):
    api.add_resource(Covid, '/covid')
    api.add_resource(Fire, '/')
