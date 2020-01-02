
# ViriCiti assignment result install instructions
If you have docker and docker-compose installed on your computer - just run this:

    $ docker-compose build && docker-compose up

Open http://localhost:8080 in your browser

By default it will publish only data that we have in csv file. That's why after a couple of minutes you will not see realtime vehicle info updates. You can set REALTIME environment variable of vehicle-data-generator to "true" to send current timestamp with data from csv. In this case you will always see real time updates on a page.