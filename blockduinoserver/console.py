from bottle import request, Bottle, abort
app = Bottle()
import time
import serial

@app.route('/websocket')
def handle_websocket():
       wsock = request.environ.get('wsgi.websocket')
       with serial.Serial('COM3', 9600) as arduino:
           time.sleep(2)
           while True:
               rawString = arduino.readline()
               rawString=rawString.decode('utf-8')
               wsock.send(str(rawString))

from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
try:
    server = WSGIServer(("0.0.0.0", 8080), app,
                       handler_class=WebSocketHandler)
    server.serve_forever()
except:
    pass
