#!/usr/local/bin/python3

import requests
import sys
import os
import time
from bs4 import BeautifulSoup
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class CricNews(Resource):
    @cross_origin()
    def get(self):
        r = requests.get('https://www.cricbuzz.com/cricket-news/latest-news')
        s = BeautifulSoup(r.text, 'html.parser')

        news = s.findAll('div',{'class':'cb-col cb-col-100 cb-lst-itm cb-lst-itm-lg'})

        return {
            'news': [{
                'headlines': n.a.get('title'),
                'details': n.find('div', {'class': 'cb-nws-intr'}).text,
                'link': 'http://cricbuzz.com'+n.a.get('href')
            } for n in news]
        }

api.add_resource(CricNews, "/")

if __name__ == '__main__':
    app.run(host="localhost",port="5000",debug=True,threaded=True)
