from api.coronavirus.resource import Covid, CovidByCountie
from api.wildfire.resource import Fires, FireByCountie

def initialize_routes(api):
    api.add_resource(Covid, '/coronavirus/counties')
    api.add_resource(CovidByCountie, '/coronavirus/countie/<string:countie>')
    api.add_resource(Fires, '/wildfire/counties')
    api.add_resource(FireByCountie, '/wildfire/countie/<string:countie>')

