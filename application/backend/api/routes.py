from api.coronavirus.resource import Covid, CovidByCountie
from api.wildfire.resource import FireList, FireByCountie, FireByName
from api.directors.resource import DirectorLogin, UpdateHealth
from api.administrators.resource import CovidUpdates, AdministratorLogin, ApproveCovid

def initialize_routes(api):
    api.add_resource(Covid, '/coronavirus/counties')
    api.add_resource(CovidByCountie, '/coronavirus/countie/<string:countie>')
    api.add_resource(FireList, '/wildfire/counties')
    api.add_resource(FireByCountie, '/wildfire/countie/<string:countie>')
    api.add_resource(FireByName, '/wildfire/firename/<string:name>')
    api.add_resource(DirectorLogin, '/director-login/')
    api.add_resource(UpdateHealth, '/update-covid/')
    api.add_resource(CovidUpdates, '/covid-updates/')
    api.add_resource(ApproveCovid, '/approve-covid/')
    api.add_resource(AdministratorLogin, '/administrator-login/')