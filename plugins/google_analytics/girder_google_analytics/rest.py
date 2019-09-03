# -*- coding: utf-8 -*-
from girderformindlogger.api import access
from girderformindlogger.api.describe import Description, describeRoute
from girderformindlogger.api.rest import Resource
from girderformindlogger.models.setting import Setting

from .settings import PluginSettings


class GoogleAnalytics(Resource):
    def __init__(self):
        super(GoogleAnalytics, self).__init__()
        self.resourceName = 'google_analytics'
        self.route('GET', ('id',), self.getId)

    @access.public
    @describeRoute(
        Description('Public url for getting the Google Analytics tracking id.')
    )
    def getId(self, params):
        trackingId = Setting().get(PluginSettings.TRACKING_ID)
        return {'google_analytics_id': trackingId}
