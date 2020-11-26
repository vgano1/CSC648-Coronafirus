from api.coronavirus.resource import Covid, CovidByCountie
from api.wildfire.resource import FireList, FireByCountie, FireByName
from api.directors.resource import DirectorLogin, UpdateCovid, CovidDataAvailable, UpdateFire, FireDataAvailable, AskCovidAlert, DirectorAddFire
from api.administrators.resource import CovidUpdates, AdministratorLogin, ApproveCovid, ApproveFire, SendAlert, FireUpdates, GetAlerts, ApproveFireAdd, NewFires
from api.users.resource import CreateUser

def initialize_routes(api):
    api.add_resource(Covid, '/coronavirus/counties')
    api.add_resource(CovidByCountie, '/coronavirus/countie/<string:countie>')
    api.add_resource(FireList, '/wildfire/counties')
    api.add_resource(FireByCountie, '/wildfire/countie/<string:countie>')
    api.add_resource(FireByName, '/wildfire/firename/<string:name>')
    api.add_resource(DirectorLogin, '/director-login/')
    api.add_resource(CovidDataAvailable, '/director-countie-covid/')
    api.add_resource(UpdateCovid, '/update-covid/')
    api.add_resource(CovidUpdates, '/covid-updates/')
    api.add_resource(FireUpdates, '/fire-updates/')
    api.add_resource(ApproveCovid, '/approve-covid/')
    api.add_resource(AdministratorLogin, '/administrator-login/')
    api.add_resource(UpdateFire, '/update-fire/')
    api.add_resource(ApproveFire, '/approve-fire/')
    api.add_resource(FireDataAvailable, '/director-countie-fire/')
    api.add_resource(CreateUser, '/create-user/')
    api.add_resource(AskCovidAlert, '/create-alert/')
    api.add_resource(SendAlert, '/send-alert/')
    api.add_resource(GetAlerts, '/get-alerts/')
    api.add_resource(DirectorAddFire, '/add-fire/')
    api.add_resource(ApproveFireAdd, '/approve-add-fire/')
    api.add_resource(NewFires, '/new-fires/')

    # api.add_resource(SendMail, '/send-mail/')